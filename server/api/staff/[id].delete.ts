import { getDb } from '~/server/utils/db'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const db = getDb()

  const index = db.staff.findIndex((s) => s.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Staff member not found' })
  }

  const deleted = db.staff.splice(index, 1)
  return { success: true, data: deleted[0] }
})
