import { getDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const db = getDb()

  const index = db.inquiries.findIndex((iq) => iq.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Inquiry not found' })
  }

  db.inquiries[index] = { ...db.inquiries[index], ...body }
  return { success: true, data: db.inquiries[index] }
})
