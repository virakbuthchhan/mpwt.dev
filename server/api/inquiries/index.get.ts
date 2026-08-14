import { getDb } from '~/server/utils/db'

export default defineEventHandler((event) => {
  const db = getDb()
  return { data: db.inquiries }
})
