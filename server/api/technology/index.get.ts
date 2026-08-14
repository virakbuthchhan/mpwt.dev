import { prisma } from '~/server/utils/prisma'
import { getCache, setCache } from '~/server/utils/redis'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category = query.category && query.category !== 'All' ? String(query.category) : undefined
  const status = query.status && query.status !== 'All' ? String(query.status) : undefined
  const search = String(query.search || '').trim().toLowerCase()

  const cacheKey = `tech:list:${category || 'all'}:${status || 'all'}:${search}`
  const cached = await getCache<any[]>(cacheKey)
  if (cached) return { data: cached, cached: true }

  let list: any[] = []
  try {
    list = await prisma.technology.findMany({
      where: {
        ...(category ? { category } : {}),
        ...(status ? { status } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { descriptionKh: { contains: search, mode: 'insensitive' } },
                { descriptionEn: { contains: search, mode: 'insensitive' } }
              ]
            }
          : {})
      },
      orderBy: { createdAt: 'desc' }
    })
  } catch {
    list = []
  }

  await setCache(cacheKey, list, 180)
  return { data: list }
})
