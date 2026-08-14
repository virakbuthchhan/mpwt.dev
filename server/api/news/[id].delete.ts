import { getDb } from '~/server/utils/db'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const db = getDb()

  const index = db.news.findIndex((n) => n.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'News article not found' })
  }

  const deleted = db.news.splice(index, 1)
  return { success: true, data: deleted[0] }
})
