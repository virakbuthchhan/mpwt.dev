import { getDb } from '~/server/utils/db'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const q = String(query.q || '').trim().toLowerCase()
  const db = getDb()

  if (!q) {
    return {
      news: [],
      projects: [],
      staff: [],
      faq: [],
      openData: [],
      technology: []
    }
  }

  const news = db.news.filter(
    (n) =>
      n.titleKh.toLowerCase().includes(q) ||
      n.titleEn.toLowerCase().includes(q) ||
      n.excerptKh.toLowerCase().includes(q) ||
      n.excerptEn.toLowerCase().includes(q)
  )

  const projects = db.projects.filter(
    (p) =>
      p.titleKh.toLowerCase().includes(q) ||
      p.titleEn.toLowerCase().includes(q) ||
      p.descriptionKh.toLowerCase().includes(q) ||
      p.descriptionEn.toLowerCase().includes(q)
  )

  const staff = db.staff.filter(
    (s) =>
      s.nameKh.toLowerCase().includes(q) ||
      s.nameEn.toLowerCase().includes(q) ||
      s.positionKh.toLowerCase().includes(q) ||
      s.positionEn.toLowerCase().includes(q)
  )

  const faq = db.faq.filter(
    (f) =>
      f.questionKh.toLowerCase().includes(q) ||
      f.questionEn.toLowerCase().includes(q) ||
      f.answerKh.toLowerCase().includes(q) ||
      f.answerEn.toLowerCase().includes(q)
  )

  const openData = db.datasets.filter(
    (d) =>
      d.titleKh.toLowerCase().includes(q) ||
      d.titleEn.toLowerCase().includes(q) ||
      d.descriptionKh.toLowerCase().includes(q) ||
      d.descriptionEn.toLowerCase().includes(q)
  )

  const technology = db.technology.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.descriptionKh.toLowerCase().includes(q) ||
      t.descriptionEn.toLowerCase().includes(q) ||
      t.techStack.some((tech) => tech.toLowerCase().includes(q))
  )

  return {
    query: q,
    results: {
      news,
      projects,
      staff,
      faq,
      openData,
      technology
    }
  }
})
