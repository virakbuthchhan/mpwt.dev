import { getDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const db = getDb()

  const index = db.news.findIndex((n) => n.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'News article not found' })
  }

  db.news[index] = { ...db.news[index], ...body }
  return { success: true, data: db.news[index] }
})
