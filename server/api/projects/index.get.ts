import { prisma } from '~/server/utils/prisma'
import { getCache, setCache } from '~/server/utils/redis'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const status = query.status && query.status !== 'All' ? String(query.status) : undefined
  const year = query.year && query.year !== 'All' ? Number(query.year) : undefined
  const search = String(query.search || '').trim().toLowerCase()

  const cacheKey = `projects:list:${status || 'all'}:${year || 'all'}:${search}`
  const cached = await getCache<any[]>(cacheKey)
  if (cached) return { data: cached, cached: true }

  let list: any[] = []
  try {
    list = await prisma.project.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(year ? { year } : {}),
        ...(search
          ? {
              OR: [
                { titleKh: { contains: search, mode: 'insensitive' } },
                { titleEn: { contains: search, mode: 'insensitive' } },
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

  await setCache(cacheKey, list, 120)
  return { data: list }
})
