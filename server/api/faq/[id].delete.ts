import { getDb } from '~/server/utils/db'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const db = getDb()

  const index = db.faq.findIndex((f) => f.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'FAQ item not found' })
  }

  const deleted = db.faq.splice(index, 1)
  return { success: true, data: deleted[0] }
})
