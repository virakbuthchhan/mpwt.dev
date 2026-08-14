import { getDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const db = getDb()

  const index = db.datasets.findIndex((d) => d.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Dataset not found' })
  }

  db.datasets[index] = { ...db.datasets[index], ...body }
  return { success: true, data: db.datasets[index] }
})
