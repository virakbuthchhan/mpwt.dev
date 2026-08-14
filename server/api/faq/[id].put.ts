import { getDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const db = getDb()

  const index = db.faq.findIndex((f) => f.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'FAQ item not found' })
  }

  db.faq[index] = { ...db.faq[index], ...body }
  return { success: true, data: db.faq[index] }
})
