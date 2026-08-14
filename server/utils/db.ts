import jwt from 'jsonwebtoken'

const JWT_SECRET = 'mpwt-secret-key-2026-dits-gdptr'

// Mock Data Seed
export interface NewsItem {
  id: string
  slug: string
  titleKh: string
  titleEn: string
  excerptKh: string
  excerptEn: string
  contentKh: string
  contentEn: string
  category: string
  author: string
  publishedAt: string
  imageUrl: string
  views: number
}

export interface ProjectItem {
  id: string
  titleKh: string
  titleEn: string
  descriptionKh: string
  descriptionEn: string
  status: 'Planning' | 'In Progress' | 'Completed'
  progress: number
  timeline: string
  responsibleUnit: string
  unitKh: string
  year: number
  imageUrl: string
}

export interface StaffItem {
  id: string
  nameKh: string
  nameEn: string
  positionKh: string
  positionEn: string
  unitKh: string
  unitEn: string
  email: string
  phone: string
  photo: string
}

export interface FaqItem {
  id: string
  questionKh: string
  questionEn: string
  answerKh: string
  answerEn: string
  category: 'General' | 'Services' | 'Support' | 'OpenData'
}

export interface DatasetItem {
  id: string
  titleKh: string
  titleEn: string
  descriptionKh: string
  descriptionEn: string
  category: string
  format: 'CSV' | 'JSON' | 'PDF'
  fileSize: string
  lastUpdated: string
  downloads: number
  downloadUrl: string
}

export interface TechItem {
  id: string
  name: string
  descriptionKh: string
  descriptionEn: string
  category: 'Web' | 'Mobile' | 'Infrastructure' | 'Data'
  techStack: string[]
  status: 'Live' | 'In Development' | 'Maintenance'
  launchYear: number
  systemUrl: string
  logo: string
}

export interface InquiryItem {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  read: boolean
}

export interface AdminUser {
  id: string
  username: string
  email: string
  name: string
  role: 'Super Admin' | 'Editor' | 'Viewer'
  avatar: string
}

export interface SiteSettings {
  announcementTickerKh: string
  announcementTickerEn: string
  maintenanceMode: boolean
  contactPhone: string
  contactEmail: string
  officeHours: string
}

// Initial Database State
const dbState = {
  news: [
    {
      id: '1',
      slug: 'mpwt-launches-new-driver-license-digital-system',
      titleKh: 'ក្រសួងសាធារណការ ប្រកាសដាក់ឱ្យប្រើប្រាស់ប្រព័ន្ធឌីជីថលស្វ័យប្រវត្តិកម្មបណ្ណបើកបរថ្មី',
      titleEn: 'MPWT Launches New Driver License Digital Automation System',
      excerptKh: 'ប្រព័ន្ធថ្មីនេះជួយសម្រួលដល់ប្រជាពលរដ្ឋក្នុងការស្នើសុំ និងបន្តបណ្ណបើកបរតាមអនឡាញប្រកបដោយភាពរហ័ស និងតម្លាភាព។',
      excerptEn: 'The new system enables citizens to renew and apply for driver licenses online efficiently and transparently.',
      contentKh: '<p>នាយកដ្ឋានប្រព័ន្ធបច្ចេកវិទ្យាព័ត៌មាន នៃអគ្គនាយកដ្ឋានបច្ចេកវិទ្យាឌីជីថល និងផ្សព្វផ្សាយសាធារណៈ បានបញ្ចប់ការអភិវឌ្ឍប្រព័ន្ធស្វ័យប្រវត្តិកម្មបណ្ណបើកបរទម្រង់ថ្មី ដែលរួមបញ្ចូលបច្ចេកវិទ្យា QR-Code សុវត្ថិភាពខ្ពស់ និងការទូទាត់ប្រាក់តាមប្រព័ន្ធបង់ប្រាក់ឌីជីថល الوطنية។</p><p>ប្រព័ន្ធនេះអនុញ្ញាតឱ្យប្រជាពលរដ្ឋបំពេញព័ត៌មាន និងផ្ទុកឡើងឯកសារចាំបាច់ពីគ្រប់ទីកន្លែង ដោយមិនចាំបាច់រង់ចាំយូរនៅទីស្តីការក្រសួង ឬមន្ទីរសាធារណការឡើយ។</p>',
      contentEn: '<p>The Department of Information Technology Systems under GDPTR has successfully completed the upgrading of the Driver License Automation Platform featuring high-security QR verification and instant payment gateway integration.</p><p>Citizens can now upload documents, schedule medical exams, and track delivery seamlessly from home.</p>',
      category: 'Digital Innovation',
      author: 'DITS Admin',
      publishedAt: '2026-08-10',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      views: 342
    },
    {
      id: '2',
      slug: 'dits-upgrades-national-road-monitoring-data-center',
      titleKh: 'នាយកដ្ឋានប្រព័ន្ធបច្ចេកវិទ្យាព័ត៌មាន ដំឡើងកម្រិតមជ្ឈមណ្ឌលទិន្នន័យតាមដានផ្លូវថ្នល់ជាតិ',
      titleEn: 'DITS Upgrades National Road Infrastructure Data Center',
      excerptKh: 'ការអភិវឌ្ឍហេដ្ឋារចនាសម្ព័ន្ធមជ្ឈមណ្ឌលទិន្នន័យ Cloud រឹងមាំ ដើម្បីទ្រទ្រង់ប្រព័ន្ធចរាចរណ៍ឆ្លាតវៃ (ITS)។',
      excerptEn: 'Upgrading cloud infrastructure to support Intelligent Transportation Systems (ITS) nationwide.',
      contentKh: '<p>ដើម្បីឆ្លើយតបនឹងការកើនឡើងនៃទិន្នន័យចរាចរណ៍ និងការអនុវត្តប្រព័ន្ធកាមេរ៉ាឆ្លាតវៃ នាយកដ្ឋាន IT បានពង្រីកសមត្ថភាព Server និងដំឡើងប្រព័ន្ធសុវត្ថិភាព Cybersecurity ថ្មីស្រឡាង។</p>',
      contentEn: '<p>To support high-frequency traffic sensors and intelligent transport nodes, DITS has doubled server capacity and deployed robust cybersecurity defenses.</p>',
      category: 'Infrastructure',
      author: 'Infra Team',
      publishedAt: '2026-08-04',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
      views: 218
    },
    {
      id: '3',
      slug: 'workshop-on-open-transport-data-standards',
      titleKh: 'សិក្ខាសាលាស្តីពីការរៀបចំស្តង់ដារទិន្នន័យដឹកជញ្ជូនបើកទូលាយសម្រាប់កម្ពុជា',
      titleEn: 'Workshop on Transport Open Data Standards for Cambodia',
      excerptKh: 'ការប្រមូលផ្តុំអ្នកជំនាញ IT និងដៃគូអភិវឌ្ឍន៍ ដើម្បីជំរុញការចែករំលែកទិន្នន័យដឹកជញ្ជូនសាធារណៈ។',
      excerptEn: 'Bringing together IT experts and development partners to harmonize open transport dataset formats.',
      contentKh: '<p>នាយកដ្ឋានបានរៀបចំសិក្ខាសាលាបណ្តុះបណ្តាលស្តីពីការប្រើប្រាស់ទម្រង់ API និង JSON Standard សម្រាប់ចែករំលែកទិន្នន័យផ្លូវថ្នល់ និងស្ពាន។</p>',
      contentEn: '<p>DITS hosted a capacity-building workshop focusing on standardized REST APIs and geospatial datasets for public transport analysis.</p>',
      category: 'Open Data',
      author: 'Data Unit',
      publishedAt: '2026-07-28',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
      views: 185
    }
  ] as NewsItem[],

  projects: [
    {
      id: 'p1',
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
      id: 'p2',
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
    },
    {
      id: 'p3',
      titleKh: 'បណ្តាញទិន្នន័យភូមិសាស្ត្រផ្លូវថ្នល់ និងស្ពាន (Geospatial Road Asset System - RAMS)',
      titleEn: 'Geospatial Road Asset Management System (RAMS-GIS)',
      descriptionKh: 'ប្រព័ន្ធព័ត៌មានភូមិសាស្ត្រ GIS សម្រាប់កត់ត្រា និងគូសផែនទីស្ថានភាពផ្លូវថ្នល់ ស្ពាន និងលូទូទាំងប្រទេស។',
      descriptionEn: 'GIS-based asset mapping system for tracking national road conditions, bridges, and culverts.',
      status: 'In Progress',
      progress: 60,
      timeline: '2025 - 2027',
      responsibleUnit: 'Data Management & GIS Unit',
      unitKh: 'ការិយាល័យគ្រប់គ្រងទិន្នន័យ និង GIS',
      year: 2026,
      imageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'p4',
      titleKh: 'កម្មវិធីទូរស័ព្ទព័ត៌មានផ្លូវថ្នល់ និងរាយការណ៍ជួសជុល (ROAD CARE Mobile App v3.0)',
      titleEn: 'ROAD CARE Mobile App Upgrade v3.0',
      descriptionKh: 'កែលម្អកម្មវិធីទូរស័ព្ទ ROAD CARE ឱ្យកាន់តែងាយស្រួល ក្នុងការរាយការណ៍ផ្លូវខូចជម្រៅ និងតាមដានដំណោះស្រាយ។',
      descriptionEn: 'Upgrading the ROAD CARE citizen app for seamless reporting of potholes and road repairs.',
      status: 'Planning',
      progress: 25,
      timeline: '2026 - 2027',
      responsibleUnit: 'Mobile Innovation Unit',
      unitKh: 'ការិយាល័យនវានុវត្តន៍ចល័ត',
      year: 2026,
      imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80'
    }
  ] as ProjectItem[],

  staff: [
    {
      id: 's1',
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
      id: 's2',
      nameKh: 'លោកស្រី លី សុខជា',
      nameEn: 'Mrs. Ly Sokchea',
      positionKh: 'អនុប្រធាននាយកដ្ឋាន',
      positionEn: 'Deputy Director',
      unitKh: 'ថ្នាក់ដឹកនាំនាយកដ្ឋាន',
      unitEn: 'Department Executive',
      email: 'sokchea.ly@mpwt.gov.kh',
      phone: '+855 23 888 102',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 's3',
      nameKh: 'លោក ចាន់ វិចិត្រ',
      nameEn: 'Mr. Chan Vicheat',
      positionKh: 'ប្រធានការិយាល័យអភិវឌ្ឍន៍កម្មវិធី',
      positionEn: 'Head of Software Development Unit',
      unitKh: 'ការិយាល័យអភិវឌ្ឍន៍កម្មវិធី',
      unitEn: 'Software Development Unit',
      email: 'vicheat.chan@mpwt.gov.kh',
      phone: '+855 23 888 103',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 's4',
      nameKh: 'លោក គង់ រដ្ឋា',
      nameEn: 'Mr. Kong Ratha',
      positionKh: 'ប្រធានការិយាល័យហេដ្ឋារចនាសម្ព័ន្ធ និងបណ្តាញ',
      positionEn: 'Head of Infrastructure & Network Unit',
      unitKh: 'ការិយាល័យហេដ្ឋារចនាសម្ព័ន្ធ និងបណ្តាញ',
      unitEn: 'Infrastructure & Network Unit',
      email: 'ratha.kong@mpwt.gov.kh',
      phone: '+855 23 888 104',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 's5',
      nameKh: 'កញ្ញា ម៉េង សុភី',
      nameEn: 'Ms. Meng Sophy',
      positionKh: 'ប្រធានការិយាល័យគ្រប់គ្រងទិន្នន័យ',
      positionEn: 'Head of Data Management Unit',
      unitKh: 'ការិយាល័យគ្រប់គ្រងទិន្នន័យ និង GIS',
      unitEn: 'Data Management & GIS Unit',
      email: 'sophy.meng@mpwt.gov.kh',
      phone: '+855 23 888 105',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80'
    }
  ] as StaffItem[],

  faq: [
    {
      id: 'f1',
      questionKh: 'តើខ្ញុំអាចស្នើសុំបន្តបណ្ណបើកបរតាមអនឡាញយ៉ាងដូចម្តេច?',
      questionEn: 'How can I renew my driver license online?',
      answerKh: 'អ្នកអាចចូលទៅកាន់ប្រព័ន្ធស្វ័យប្រវត្តិកម្មបណ្ណបើកបរ (driver.mpwt.gov.kh) បំពេញព័ត៌មាន ផ្ទុកឡើងរូបថត និងលិខិតពិនិត្យកាយសម្បទា រួចទូទាត់ប្រាក់តាម ABA/Wing ជាការស្រេច។',
      answerEn: 'Visit driver.mpwt.gov.kh, upload required documents and health certificate, and pay via supported mobile banking apps.',
      category: 'Services'
    },
    {
      id: 'f2',
      questionKh: 'តើកម្មវិធី ROAD CARE ប្រើប្រាស់សម្រាប់ធ្វើអ្វី?',
      questionEn: 'What is the purpose of the ROAD CARE app?',
      answerKh: 'ROAD CARE ជាកម្មវិធីទូរស័ព្ទផ្លូវការ ដែលអនុញ្ញាតឱ្យប្រជាពលរដ្ឋថតរូប និងរាយការណ៍អំពីផ្លូវខូចជម្រៅ ឬស្ពានមានបញ្ហា ទៅកាន់ក្រុមការងារបច្ចេកទេសដើម្បីចុះជួសជុល។',
      answerEn: 'ROAD CARE allows citizens to photograph and submit location reports of potholes and damaged road infrastructure directly to maintenance crews.',
      category: 'General'
    },
    {
      id: 'f3',
      questionKh: 'តើនាយកដ្ឋានផ្តល់សេវាគាំទ្រ IT ដល់អង្គភាពខាងក្រៅដែរឬទេ?',
      questionEn: 'Does DITS provide IT technical support to external units?',
      answerKh: 'នាយកដ្ឋានផ្តល់ការគាំទ្របច្ចេកទេស និងការតភ្ជាប់ API ដល់ក្រសួង-ស្ថាប័នរដ្ឋ និងដៃគូអភិវឌ្ឍន៍ដែលមានកិច្ចព្រមព្រៀងសហប្រតិបត្តិការ។',
      answerEn: 'DITS provides technical integrations and API access to authorized government bodies and development partners under formal agreements.',
      category: 'Support'
    },
    {
      id: 'f4',
      questionKh: 'តើខ្ញុំអាចទាញយកទិន្នន័យដឹកជញ្ជូនសាធារណៈដោយសេរីបាននៅឯណា?',
      questionEn: 'Where can I access free public transport datasets?',
      answerKh: 'អ្នកអាចចូលទៅកាន់ទំព័រ Open Data Portal (mpwt.dev/open-data) ដើម្បីទាញយកទិន្នន័យជាទម្រង់ CSV, JSON ឬ PDF។',
      answerEn: 'Access the Open Data Portal at mpwt.dev/open-data to download datasets in CSV, JSON, or PDF formats.',
      category: 'OpenData'
    }
  ] as FaqItem[],

  datasets: [
    {
      id: 'd1',
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
    },
    {
      id: 'd2',
      titleKh: 'បញ្ជីប្រវែងផ្លូវជាតិ និងផ្លូវខេត្តទូទាំងប្រទេស',
      titleEn: 'National and Provincial Road Network Length Dataset',
      descriptionKh: 'ទិន្នន័យភូមិសាស្ត្រផ្លូវជាតិ ផ្លូវខេត្ត ប្រភេទកម្រាលផ្លូវ (DBST, AC, Concrete) និងប្រវែងសរុប។',
      descriptionEn: 'Geospatial inventory of national/provincial roads, pavement types, and lengths.',
      category: 'Infrastructure',
      format: 'JSON',
      fileSize: '8.7 MB',
      lastUpdated: '2026-02-01',
      downloads: 980,
      downloadUrl: '/data/road-network-2026.json'
    },
    {
      id: 'd3',
      titleKh: 'របាយការណ៍សកម្មភាពត្រួតពិនិត្យលក្ខណៈបច្ចេកទេសយានយន្ត (ឆៀក)',
      titleEn: 'Vehicle Inspection Technical Compliance Report',
      descriptionKh: 'របាយការណ៍សង្ខេបអំពីលទ្ធផលឆៀកយានយន្ត ចំនួនយានយន្តជាប់ និងធ្លាក់តាមមជ្ឈមណ្ឌល។',
      descriptionEn: 'Summary report on vehicle inspection outcomes, pass/fail rates per inspection center.',
      category: 'Safety & Inspection',
      format: 'PDF',
      fileSize: '2.1 MB',
      lastUpdated: '2026-03-10',
      downloads: 650,
      downloadUrl: '/data/inspection-report-2026.pdf'
    }
  ] as DatasetItem[],

  technology: [
    {
      id: 't1',
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
      id: 't2',
      name: 'ROAD CARE Mobile',
      descriptionKh: 'កម្មវិធីទូរស័ព្ទដៃសម្រាប់ប្រជាពលរដ្ឋរាយការណ៍អំពីផ្លូវខូច និងតាមដានសកម្មភាពជួសជុល។',
      descriptionEn: 'Citizen mobile application for reporting potholes and monitoring road maintenance status.',
      category: 'Mobile',
      techStack: ['Flutter', 'Node.js', 'PostGIS', 'Firebase'],
      status: 'Live',
      launchYear: 2021,
      systemUrl: 'https://roadcare.mpwt.gov.kh',
      logo: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 't3',
      name: 'MPWT Geospatial Data Lake',
      descriptionKh: 'មជ្ឈមណ្ឌលគ្រប់គ្រងទិន្នន័យភូមិសាស្ត្រ GIS ផ្លូវថ្នល់ ស្ពាន និងច្រកទ្វារព្រំដែន។',
      descriptionEn: 'Geospatial GIS data warehouse for road assets, bridges, ports, and border check points.',
      category: 'Data',
      techStack: ['Python', 'GeoServer', 'PostgreSQL/PostGIS', 'QGIS'],
      status: 'In Development',
      launchYear: 2025,
      systemUrl: 'https://gis.mpwt.gov.kh',
      logo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 't4',
      name: 'Government Private Cloud Infrastructure',
      descriptionKh: 'បណ្តាញម៉ាស៊ីនមេ និងហេដ្ឋារចនាសម្ព័ន្ធ Cloud ផ្ទៃក្នុងរបស់ក្រសួងប្រកបដោយសុវត្ថិភាពខ្ពស់។',
      descriptionEn: 'Highly available government private cloud infrastructure hosting all ministry critical systems.',
      category: 'Infrastructure',
      techStack: ['Kubernetes', 'Proxmox VE', 'Ceph Storage', 'Palo Alto Networks'],
      status: 'Live',
      launchYear: 2022,
      systemUrl: 'https://cloud.mpwt.gov.kh',
      logo: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&auto=format&fit=crop&q=80'
    }
  ] as TechItem[],

  inquiries: [
    {
      id: 'iq1',
      name: 'លោក សុខ ពិសិដ្ឋ',
      email: 'sok.piseith@example.com',
      subject: 'សាកសួរអំពីការភ្ជាប់ API ទិន្នន័យផ្លូវថ្នល់',
      message: 'សូមរាប់អាន! ក្រុមហ៊ុនខ្ញុំបាទចង់ស្នើសុំតភ្ជាប់ API ដើម្បីទាញយកទិន្នន័យស្ថានភាពចរាចរណ៍ផ្លូវជាតិ។ សូមមេត្តាណែនាំនីតិវិធី។',
      createdAt: '2026-08-12 14:30',
      read: false
    },
    {
      id: 'iq2',
      name: 'Elena Rostova',
      email: 'elena.r@devpartner.org',
      subject: 'Inquiry on Open Data Transport Standards',
      message: 'Greetings DITS team. We would like to request technical details on the JSON schema used for the RAMS dataset.',
      createdAt: '2026-08-11 09:15',
      read: true
    }
  ] as InquiryItem[],

  settings: {
    announcementTickerKh: 'សេចក្តីប្រកាស៖ នាយកដ្ឋាន IT នឹងធ្វើការផ្អាកប្រព័ន្ធបណ្តោះអាសន្ននៅថ្ងៃចុងសប្តាហ៍នេះ ចាប់ពីម៉ោង ១២យប់ ដល់ម៉ោង ៤ព្រឹក ដើម្បីដំឡើងបច្ចុប្បន្នភាពសុវត្ថិភាព។',
    announcementTickerEn: 'Announcement: DITS will perform scheduled maintenance this weekend from 12:00 AM to 04:00 AM to deploy security updates.',
    maintenanceMode: false,
    contactPhone: '+855 23 888 100',
    contactEmail: 'dits@mpwt.gov.kh',
    officeHours: 'Mon - Fri: 8:00 AM - 5:00 PM'
  } as SiteSettings,

  adminUsers: [
    {
      id: 'u1',
      username: 'admin',
      email: 'admin@mpwt.dev',
      name: 'Super Admin',
      role: 'Super Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
    },
    {
      id: 'u2',
      username: 'editor',
      email: 'editor@mpwt.dev',
      name: 'Content Editor',
      role: 'Editor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
    },
    {
      id: 'u3',
      username: 'viewer',
      email: 'viewer@mpwt.dev',
      name: 'Audit Viewer',
      role: 'Viewer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80'
    }
  ] as AdminUser[]
}

// In-Memory Database Accessors
export function getDb() {
  return dbState
}

export function generateToken(user: AdminUser) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  )
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any
  } catch (err) {
    return null
  }
}
