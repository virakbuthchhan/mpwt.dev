import { prisma } from '~/server/utils/prisma'
import { invalidateCachePattern } from '~/server/utils/redis'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const slug = body.slug || body.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  const newItem = await prisma.news.create({
    data: {
      slug,
      titleKh: body.titleKh || '',
      titleEn: body.titleEn || '',
      excerptKh: body.excerptKh || '',
      excerptEn: body.excerptEn || '',
      contentKh: body.contentKh || '',
      contentEn: body.contentEn || '',
      category: body.category || 'General',
      author: body.author || 'DITS Admin',
      publishedAt: body.publishedAt || new Date().toISOString().split('T')[0],
      imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      views: 0
    }
  })

  await invalidateCachePattern('news:*')
  return { success: true, data: newItem }
})
