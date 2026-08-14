import { getDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = getDb()

  if (!body.name || !body.email || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, email, and message are required'
    })
  }

  const newItem = {
    id: 'iq' + Date.now(),
    name: body.name,
    email: body.email,
    subject: body.subject || 'General Inquiry',
    message: body.message,
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    read: false
  }

  db.inquiries.unshift(newItem)
  return { success: true, message: 'Inquiry submitted successfully', data: newItem }
})
