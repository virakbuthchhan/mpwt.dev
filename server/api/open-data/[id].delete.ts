import { getDb } from '~/server/utils/db'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const db = getDb()

  const index = db.datasets.findIndex((d) => d.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Dataset not found' })
  }

  const deleted = db.datasets.splice(index, 1)
  return { success: true, data: deleted[0] }
})
