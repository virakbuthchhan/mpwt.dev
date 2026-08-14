import { prisma } from '~/server/utils/prisma'
import { getCache, setCache } from '~/server/utils/redis'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const search = String(query.search || '').trim().toLowerCase()
  const category = query.category ? String(query.category) : undefined

  const cacheKey = `news:list:${search}:${category || 'all'}`
  const cached = await getCache<any[]>(cacheKey)
  if (cached) {
    return { data: cached, cached: true }
  }

  let list: any[] = []
  try {
    list = await prisma.news.findMany({
      where: {
        ...(category ? { category } : {}),
        ...(search
          ? {
              OR: [
                { titleKh: { contains: search, mode: 'insensitive' } },
                { titleEn: { contains: search, mode: 'insensitive' } },
                { excerptKh: { contains: search, mode: 'insensitive' } },
                { excerptEn: { contains: search, mode: 'insensitive' } }
              ]
            }
          : {})
      },
      orderBy: { publishedAt: 'desc' }
    })
  } catch {
    // Fallback if DB connection pending
    list = []
  }

  await setCache(cacheKey, list, 120) // cache for 2 mins
  return { data: list }
})
