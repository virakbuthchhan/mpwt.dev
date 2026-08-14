import { getDb } from '~/server/utils/db'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const db = getDb()

  const index = db.technology.findIndex((t) => t.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Tech item not found' })
  }

  const deleted = db.technology.splice(index, 1)
  return { success: true, data: deleted[0] }
})
