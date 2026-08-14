import { getDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = getDb()

  const newItem = {
    id: 'f' + Date.now(),
    questionKh: body.questionKh || '',
    questionEn: body.questionEn || '',
    answerKh: body.answerKh || '',
    answerEn: body.answerEn || '',
    category: body.category || 'General'
  }

  db.faq.push(newItem)
  return { success: true, data: newItem }
})
