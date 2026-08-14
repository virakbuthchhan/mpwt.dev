import { getDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = getDb()

  const newItem = {
    id: 'd' + Date.now(),
    titleKh: body.titleKh || '',
    titleEn: body.titleEn || '',
    descriptionKh: body.descriptionKh || '',
    descriptionEn: body.descriptionEn || '',
    category: body.category || 'General',
    format: body.format || 'CSV',
    fileSize: body.fileSize || '1.0 MB',
    lastUpdated: body.lastUpdated || new Date().toISOString().split('T')[0],
    downloads: 0,
    downloadUrl: body.downloadUrl || '/data/dataset-sample.csv'
  }

  db.datasets.unshift(newItem)
  return { success: true, data: newItem }
})
