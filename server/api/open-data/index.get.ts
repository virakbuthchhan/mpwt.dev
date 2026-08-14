import { getDb } from '~/server/utils/db'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const db = getDb()
  let list = [...db.datasets]

  if (query.format) {
    list = list.filter((d) => d.format.toLowerCase() === String(query.format).toLowerCase())
  }

  if (query.category) {
    list = list.filter((d) => d.category === query.category)
  }

  if (query.search) {
    const q = String(query.search).toLowerCase()
    list = list.filter(
      (d) =>
        d.titleKh.toLowerCase().includes(q) ||
        d.titleEn.toLowerCase().includes(q) ||
        d.descriptionKh.toLowerCase().includes(q) ||
        d.descriptionEn.toLowerCase().includes(q)
    )
  }

  return { data: list }
})
