import { prisma } from '~/server/utils/prisma'
import { invalidateCachePattern } from '~/server/utils/redis'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const techStack = Array.isArray(body.techStack)
    ? body.techStack
    : String(body.techStack || 'Vue, Node').split(',').map((s: string) => s.trim())

  const newItem = await prisma.technology.create({
    data: {
      name: body.name || '',
      descriptionKh: body.descriptionKh || '',
      descriptionEn: body.descriptionEn || '',
      category: body.category || 'Web',
      techStack,
      status: body.status || 'Live',
      launchYear: Number(body.launchYear) || 2026,
      systemUrl: body.systemUrl || 'https://mpwt.gov.kh',
      logo: body.logo || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80'
    }
  })

  await invalidateCachePattern('tech:*')
  return { success: true, data: newItem }
})
