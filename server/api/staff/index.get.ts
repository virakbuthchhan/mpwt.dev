import { prisma } from '~/server/utils/prisma'
import { getCache, setCache } from '~/server/utils/redis'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const unit = query.unit && query.unit !== 'All' ? String(query.unit) : undefined
  const search = String(query.search || '').trim().toLowerCase()

  const cacheKey = `staff:list:${unit || 'all'}:${search}`
  const cached = await getCache<any[]>(cacheKey)
  if (cached) return { data: cached, cached: true }

  let list: any[] = []
  try {
    list = await prisma.staff.findMany({
      where: {
        ...(unit ? { unitEn: unit } : {}),
        ...(search
          ? {
              OR: [
                { nameKh: { contains: search, mode: 'insensitive' } },
                { nameEn: { contains: search, mode: 'insensitive' } },
                { positionKh: { contains: search, mode: 'insensitive' } },
                { positionEn: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } }
              ]
            }
          : {})
      },
      orderBy: { createdAt: 'asc' }
    })
  } catch {
    list = []
  }

  await setCache(cacheKey, list, 180)
  return { data: list }
})
