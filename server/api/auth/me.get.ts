import { getDb, verifyToken } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token') || getHeader(event, 'authorization')?.replace('Bearer ', '')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized - No token provided'
    })
  }

  const payload = verifyToken(token)
  if (!payload) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized - Invalid or expired token'
    })
  }

  const db = getDb()
  const user = db.adminUsers.find((u) => u.id === payload.id)
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }

  return {
    user
  }
})
