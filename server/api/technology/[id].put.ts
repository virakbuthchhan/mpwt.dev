import { getDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const db = getDb()

  const index = db.technology.findIndex((t) => t.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Tech item not found' })
  }

  if (body.techStack && typeof body.techStack === 'string') {
    body.techStack = body.techStack.split(',').map((s: string) => s.trim())
  }

  db.technology[index] = { ...db.technology[index], ...body }
  return { success: true, data: db.technology[index] }
})
