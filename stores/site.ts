import { defineStore } from 'pinia'

export const useSiteStore = defineStore('site', {
  state: () => ({
    announcementTickerKh: 'សេចក្តីប្រកាស៖ នាយកដ្ឋាន IT នឹងធ្វើការផ្អាកប្រព័ន្ធបណ្តោះអាសន្ននៅថ្ងៃចុងសប្តាហ៍នេះ ចាប់ពីម៉ោង ១២យប់ ដល់ម៉ោង ៤ព្រឹក ដើម្បីដំឡើងបច្ចុប្បន្នភាពសុវត្ថិភាព។',
    announcementTickerEn: 'Announcement: DITS will perform scheduled maintenance this weekend from 12:00 AM to 04:00 AM to deploy security updates.',
    searchQuery: '',
    unreadInquiriesCount: 1
  }),
  actions: {
    async fetchSettings() {
      try {
        const res = await $fetch<{ data: any }>('/api/settings')
        if (res.data) {
          this.announcementTickerKh = res.data.announcementTickerKh
          this.announcementTickerEn = res.data.announcementTickerEn
        }
      } catch (err) {
        console.error('Error fetching settings', err)
      }
    }
  }
})
