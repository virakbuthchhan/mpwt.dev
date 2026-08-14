import { getDb } from '~/server/utils/db'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const db = getDb()

  const index = db.projects.findIndex((p) => p.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' })
  }

  const deleted = db.projects.splice(index, 1)
  return { success: true, data: deleted[0] }
})
