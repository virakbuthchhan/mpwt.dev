import { prisma } from '~/server/utils/prisma'
import { invalidateCachePattern } from '~/server/utils/redis'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const newItem = await prisma.staff.create({
    data: {
      nameKh: body.nameKh || '',
      nameEn: body.nameEn || '',
      positionKh: body.positionKh || '',
      positionEn: body.positionEn || '',
      unitKh: body.unitKh || 'ការិយាល័យអភិវឌ្ឍន៍កម្មវិធី',
      unitEn: body.unitEn || 'Software Development Unit',
      email: body.email || '',
      phone: body.phone || '+855 23 888 100',
      photo: body.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
    }
  })

  await invalidateCachePattern('staff:*')
  return { success: true, data: newItem }
})
