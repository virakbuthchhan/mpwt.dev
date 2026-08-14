import { getDb } from '~/server/utils/db'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const db = getDb()

  const item = db.news.find((n) => n.id === id || n.slug === id)
  if (!item) {
    throw createError({ statusCode: 404, statusMessage: 'News article not found' })
  }

  // Increment views
  item.views += 1

  return { data: item }
})
