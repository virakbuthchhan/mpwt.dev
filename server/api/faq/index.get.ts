import { getDb } from '~/server/utils/db'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const db = getDb()
  let list = [...db.faq]

  if (query.category) {
    list = list.filter((f) => f.category === query.category)
  }

  if (query.search) {
    const q = String(query.search).toLowerCase()
    list = list.filter(
      (f) =>
        f.questionKh.toLowerCase().includes(q) ||
        f.questionEn.toLowerCase().includes(q) ||
        f.answerKh.toLowerCase().includes(q) ||
        f.answerEn.toLowerCase().includes(q)
    )
  }

  return { data: list }
})
