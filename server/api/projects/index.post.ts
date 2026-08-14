import { prisma } from '~/server/utils/prisma'
import { invalidateCachePattern } from '~/server/utils/redis'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const newItem = await prisma.project.create({
    data: {
      titleKh: body.titleKh || '',
      titleEn: body.titleEn || '',
      descriptionKh: body.descriptionKh || '',
      descriptionEn: body.descriptionEn || '',
      status: body.status || 'Planning',
      progress: Number(body.progress) || 0,
      timeline: body.timeline || '2026',
      responsibleUnit: body.responsibleUnit || 'Software Development Unit',
      unitKh: body.unitKh || 'ការិយាល័យអភិវឌ្ឍន៍កម្មវិធី',
      year: Number(body.year) || 2026,
      imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
    }
  })

  await invalidateCachePattern('projects:*')
  return { success: true, data: newItem }
})
