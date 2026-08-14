import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting PostgreSQL Database Seed for MPWT DITS...')

  // 1. Users
  const passwordHash = await bcrypt.hash('admin123', 10)
  
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@mpwt.dev',
      name: 'Super Admin',
      passwordHash,
      role: 'Super Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
    }
  })

  await prisma.user.upsert({
    where: { username: 'editor' },
    update: {},
    create: {
      username: 'editor',
      email: 'editor@mpwt.dev',
      name: 'Content Editor',
      passwordHash,
      role: 'Editor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
    }
  })

  await prisma.user.upsert({
    where: { username: 'viewer' },
    update: {},
    create: {
      username: 'viewer',
      email: 'viewer@mpwt.dev',
      name: 'Audit Viewer',
      passwordHash,
      role: 'Viewer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80'
    }
  })

  // 2. Settings
  await prisma.setting.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      announcementTickerKh: 'សេចក្តីប្រកាស៖ នាយកដ្ឋាន IT នឹងធ្វើការផ្អាកប្រព័ន្ធបណ្តោះអាសន្ននៅថ្ងៃចុងសប្តាហ៍នេះ ចាប់ពីម៉ោង ១២យប់ ដល់ម៉ោង ៤ព្រឹក ដើម្បីដំឡើងបច្ចុប្បន្នភាពសុវត្ថិភាព។',
      announcementTickerEn: 'Announcement: DITS will perform scheduled maintenance this weekend from 12:00 AM to 04:00 AM to deploy security updates.',
      maintenanceMode: false,
      contactPhone: '+855 23 888 100',
      contactEmail: 'dits@mpwt.gov.kh',
      officeHours: 'Mon - Fri: 8:00 AM - 5:00 PM'
    }
  })

  // 3. News Articles
  const newsCount = await prisma.news.count()
  if (newsCount === 0) {
    await prisma.news.createMany({
      data: [
        {
          slug: 'mpwt-launches-new-driver-license-digital-system',
          titleKh: 'ក្រសួងសាធារណការ ប្រកាសដាក់ឱ្យប្រើប្រាស់ប្រព័ន្ធឌីជីថលស្វ័យប្រវត្តិកម្មបណ្ណបើកបរថ្មី',
          titleEn: 'MPWT Launches New Driver License Digital Automation System',
          excerptKh: 'ប្រព័ន្ធថ្មីនេះជួយសម្រួលដល់ប្រជាពលរដ្ឋក្នុងការស្នើសុំ និងបន្តបណ្ណបើកបរតាមអនឡាញប្រកបដោយភាពរហ័ស និងតម្លាភាព។',
          excerptEn: 'The new system enables citizens to renew and apply for driver licenses online efficiently and transparently.',
          contentKh: '<p>នាយកដ្ឋានប្រព័ន្ធបច្ចេកវិទ្យាព័ត៌មាន នៃអគ្គនាយកដ្ឋានបច្ចេកវិទ្យាឌីជីថល និងផ្សព្វផ្សាយសាធារណៈ បានបញ្ចប់ការអភិវឌ្ឍប្រព័ន្ធស្វ័យប្រវត្តិកម្មបណ្ណបើកបរទម្រង់ថ្មី ដែលរួមបញ្ចូលបច្ចេកវិទ្យា QR-Code សុវត្ថិភាពខ្ពស់ និងការទូទាត់ប្រាក់តាមប្រព័ន្ធបង់ប្រាក់ឌីជីថល الوطنية។</p>',
          contentEn: '<p>The Department of Information Technology Systems under GDPTR has successfully completed the upgrading of the Driver License Automation Platform featuring high-security QR verification.</p>',
          category: 'Digital Innovation',
          author: 'DITS Admin',
          publishedAt: '2026-08-10',
          imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
          views: 342
        },
        {
          slug: 'dits-upgrades-national-road-monitoring-data-center',
          titleKh: 'នាយកដ្ឋានប្រព័ន្ធបច្ចេកវិទ្យាព័ត៌មាន ដំឡើងកម្រិតមជ្ឈមណ្ឌលទិន្នន័យតាមដានផ្លូវថ្នល់ជាតិ',
          titleEn: 'DITS Upgrades National Road Infrastructure Data Center',
          excerptKh: 'ការអភិវឌ្ឍហេដ្ឋារចនាសម្ព័ន្ធមជ្ឈមណ្ឌលទិន្នន័យ Cloud រឹងមាំ ដើម្បីទ្រទ្រង់ប្រព័ន្ធចរាចរណ៍ឆ្លាតវៃ (ITS)។',
          excerptEn: 'Upgrading cloud infrastructure to support Intelligent Transportation Systems (ITS) nationwide.',
          contentKh: '<p>ដើម្បីឆ្លើយតបនឹងការកើនឡើងនៃទិន្នន័យចរាចរណ៍ និងការអនុវត្តប្រព័ន្ធកាមេរ៉ាឆ្លាតវៃ នាយកដ្ឋាន IT បានពង្រីកសមត្ថភាព Server និងដំឡើងប្រព័ន្ធសុវត្ថិភាព Cybersecurity ថ្មីស្រឡាង។</p>',
          contentEn: '<p>To support high-frequency traffic sensors and intelligent transport nodes, DITS has doubled server capacity.</p>',
          category: 'Infrastructure',
          author: 'Infra Team',
          publishedAt: '2026-08-04',
          imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
          views: 218
        }
      ]
    })
  }

  // 4. Projects
  const projectCount = await prisma.project.count()
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          titleKh: 'ប្រព័ន្ធគ្រប់គ្រងយានយន្ត និងត្រួតពិនិត្យលក្ខណៈបច្ចេកទេស (Automated Vehicle Inspection)',
          titleEn: 'Automated Vehicle Inspection & Registration Platform',
          descriptionKh: 'ប្រព័ន្ធស្វ័យប្រវត្តិកម្មឆ្លាតវៃសម្រាប់កត់ត្រាលទ្ធផលឆៀកយានយន្ត និងគ្រប់គ្រងទិន្នន័យបច្ចេកទេសយានយន្តទូទាំងប្រទេស។',
          descriptionEn: 'Smart automation system to record vehicle inspection logs and centralize technical data nationwide.',
          status: 'Completed',
          progress: 100,
          timeline: '2024 - 2025',
          responsibleUnit: 'Software Development Unit',
          unitKh: 'ការិយាល័យអភិវឌ្ឍន៍កម្មវិធី',
          year: 2025,
          imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
        },
        {
          titleKh: 'ប្រព័ន្ធកាមេរ៉ាត្រួតពិនិត្យល្បឿន និងចរាចរណ៍លើផ្លូវល្បឿនលឿន (Expressway ITS Monitoring)',
          titleEn: 'Expressway Intelligent Traffic System (ITS Monitoring)',
          descriptionKh: 'ការដំឡើងសេនស័រ និងកាមេរ៉ា AI ដើម្បីតាមដានល្បឿន និងគ្រោះថ្នាក់ចរាចរណ៍លើផ្លូវល្បឿនលឿន ភ្នំពេញ-ព្រះសីហនុ។',
          descriptionEn: 'AI traffic monitoring sensors and speed enforcement cameras along the Phnom Penh-Sihanoukville Expressway.',
          status: 'In Progress',
          progress: 85,
          timeline: '2025 - 2026',
          responsibleUnit: 'Infrastructure & Network Unit',
          unitKh: 'ការិយាល័យហេដ្ឋារចនាសម្ព័ន្ធ និងបណ្តាញ',
          year: 2026,
          imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df515122519?w=800&auto=format&fit=crop&q=80'
        }
      ]
    })
  }

  // 5. Staff
  const staffCount = await prisma.staff.count()
  if (staffCount === 0) {
    await prisma.staff.createMany({
      data: [
        {
          nameKh: 'លោក ហ៊ិន សុវណ្ណារ៉ា',
          nameEn: 'Mr. Hin Sovannara',
          positionKh: 'ប្រធាននាយកដ្ឋាន',
          positionEn: 'Director of Department',
          unitKh: 'ថ្នាក់ដឹកនាំនាយកដ្ឋាន',
          unitEn: 'Department Executive',
          email: 'sovannara.hin@mpwt.gov.kh',
          phone: '+855 23 888 101',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
        },
        {
          nameKh: 'លោក ចាន់ វិចិត្រ',
          nameEn: 'Mr. Chan Vicheat',
          positionKh: 'ប្រធានការិយាល័យអភិវឌ្ឍន៍កម្មវិធី',
          positionEn: 'Head of Software Development Unit',
          unitKh: 'ការិយាល័យអភិវឌ្ឍន៍កម្មវិធី',
          unitEn: 'Software Development Unit',
          email: 'vicheat.chan@mpwt.gov.kh',
          phone: '+855 23 888 103',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80'
        }
      ]
    })
  }

  // 6. Technology Showcase
  const techCount = await prisma.technology.count()
  if (techCount === 0) {
    await prisma.technology.createMany({
      data: [
        {
          name: 'MPWT Automation Portal',
          descriptionKh: 'ប្រព័ន្ធមេសម្រាប់ផ្តល់សេវាសាធារណៈឌីជីថល រួមមាន ការចុះបញ្ជីយានយន្ត បណ្ណបើកបរ និងលិខិតអនុញ្ញាតដឹកជញ្ជូន។',
          descriptionEn: 'Main portal delivering e-services including vehicle registration, driving licensing, and transport permits.',
          category: 'Web',
          techStack: ['Nuxt 3', 'Laravel 11', 'PostgreSQL', 'Redis', 'Docker'],
          status: 'Live',
          launchYear: 2023,
          systemUrl: 'https://automation.mpwt.gov.kh',
          logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80'
        },
        {
          name: 'ROAD CARE Mobile',
          descriptionKh: 'កម្មវិធីទូរស័ព្ទដៃសម្រាប់ប្រជាពលរដ្ឋរាយការណ៍អំពីផ្លូវខូច និងតាមដានសកម្មភាពជួសជុល។',
          descriptionEn: 'Citizen mobile application for reporting potholes and monitoring road maintenance status.',
          category: 'Mobile',
          techStack: ['Flutter', 'Node.js', 'PostGIS', 'Firebase'],
          status: 'Live',
          launchYear: 2021,
          systemUrl: 'https://roadcare.mpwt.gov.kh',
          logo: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=400&auto=format&fit=crop&q=80'
        }
      ]
    })
  }

  // 7. FAQ & Datasets
  const faqCount = await prisma.faq.count()
  if (faqCount === 0) {
    await prisma.faq.createMany({
      data: [
        {
          questionKh: 'តើខ្ញុំអាចស្នើសុំបន្តបណ្ណបើកបរតាមអនឡាញយ៉ាងដូចម្តេច?',
          questionEn: 'How can I renew my driver license online?',
          answerKh: 'អ្នកអាចចូលទៅកាន់ប្រព័ន្ធស្វ័យប្រវត្តិកម្មបណ្ណបើកបរ (driver.mpwt.gov.kh) បំពេញព័ត៌មាន ផ្ទុកឡើងរូបថត និងលិខិតពិនិត្យកាយសម្បទា រួចទូទាត់ប្រាក់តាម ABA/Wing ជាការស្រេច។',
          answerEn: 'Visit driver.mpwt.gov.kh, upload required documents and health certificate, and pay via supported mobile banking apps.',
          category: 'Services'
        }
      ]
    })
  }

  const datasetCount = await prisma.dataset.count()
  if (datasetCount === 0) {
    await prisma.dataset.createMany({
      data: [
        {
          titleKh: 'ស្ថិតិបណ្ណបើកបរ និងយានយន្តចុះបញ្ជីឆ្នាំ ២០២៥',
          titleEn: 'Registered Vehicles & Driver Licenses Statistics 2025',
          descriptionKh: 'កញ្ចប់ទិន្នន័យសរុបនៃចំនួនយានយន្តចុះបញ្ជីថ្មី ប្រភេទយានយន្ត និងបណ្ណបើកបរដែលបានចេញ។',
          descriptionEn: 'Aggregated numbers of newly registered vehicles, vehicle types, and issued driver licenses.',
          category: 'Transport Statistics',
          format: 'CSV',
          fileSize: '4.2 MB',
          lastUpdated: '2026-01-15',
          downloads: 1240,
          downloadUrl: '/data/vehicles-2025.csv'
        }
      ]
    })
  }

  console.log('✅ PostgreSQL Database Seeding Complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
