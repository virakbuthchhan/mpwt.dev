import { getDb } from '~/server/utils/db'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const db = getDb()

  const index = db.inquiries.findIndex((iq) => iq.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Inquiry not found' })
  }

  const deleted = db.inquiries.splice(index, 1)
  return { success: true, data: deleted[0] }
})
