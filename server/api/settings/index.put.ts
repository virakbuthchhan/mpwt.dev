import { getDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = getDb()

  db.settings = { ...db.settings, ...body }
  return { success: true, data: db.settings }
})
