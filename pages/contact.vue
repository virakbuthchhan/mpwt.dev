<template>
  <div class="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-3xl mx-auto">
      <span class="text-xs font-bold text-gov-gold uppercase tracking-wider">Get In Touch</span>
      <h1 class="text-2xl sm:text-4xl font-extrabold text-gov-navy font-khmer">
        {{ $t('contact.title') }}
      </h1>
      <p class="text-xs sm:text-sm text-slate-600">
        {{ $t('contact.subtitle') }}
      </p>
      <div class="w-16 h-1 bg-gov-gold mx-auto rounded"></div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Contact Info & Map Mockup -->
      <div class="lg:col-span-5 space-y-6">
        <div class="bg-white rounded-2xl p-6 shadow-md border border-slate-200 space-y-4">
          <h3 class="text-lg font-bold text-gov-navy border-b border-slate-100 pb-3">
            📍 {{ $t('contact.address') }}
          </h3>
          <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {{ $t('contact.addressText') }}
          </p>

          <div class="space-y-2 pt-2 border-t border-slate-100 text-xs sm:text-sm">
            <div class="flex items-center gap-2 text-slate-700">
              <span class="font-bold text-gov-navy">📞 {{ $t('contact.phone') }}:</span>
              <span>+855 23 888 100</span>
            </div>
            <div class="flex items-center gap-2 text-slate-700">
              <span class="font-bold text-gov-navy">✉️ {{ $t('contact.email') }}:</span>
              <span>dits@mpwt.gov.kh</span>
            </div>
            <div class="flex items-center gap-2 text-slate-700">
              <span class="font-bold text-gov-navy">⏰ Office Hours:</span>
              <span>Mon - Fri: 8:00 AM - 5:00 PM</span>
            </div>
          </div>
        </div>

        <!-- Google Maps Embed Mockup -->
        <div class="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200 h-64 relative">
          <iframe
            title="MPWT Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.7758364812316!2d104.9012456!3d11.6038166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951664d4b1a43%3A0xb36b567d16a54625!2sMinistry%20of%20Public%20Works%20and%20Transport!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh"
            class="w-full h-full border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <!-- Online Inquiry Form -->
      <div class="lg:col-span-7 bg-white rounded-2xl p-8 shadow-md border border-slate-200 space-y-6">
        <h3 class="text-xl font-bold text-gov-navy font-khmer border-b border-slate-100 pb-4">
          📝 {{ $t('contact.inquiryForm') }}
        </h3>

        <div v-if="successMsg" class="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold">
          ✅ {{ $t('contact.successMessage') }}
        </div>

        <form @submit.prevent="submitInquiry" class="space-y-4 text-xs sm:text-sm">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="font-bold text-slate-700 block">{{ $t('contact.name') }} *</label>
              <input
                v-model="form.name"
                required
                type="text"
                :placeholder="$t('contact.namePlaceholder')"
                class="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-gold"
              />
            </div>
            <div class="space-y-1">
              <label class="font-bold text-slate-700 block">{{ $t('contact.email') }} *</label>
              <input
                v-model="form.email"
                required
                type="email"
                :placeholder="$t('contact.emailPlaceholder')"
                class="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-gold"
              />
            </div>
          </div>

          <div class="space-y-1">
            <label class="font-bold text-slate-700 block">{{ $t('contact.subject') }} *</label>
            <input
              v-model="form.subject"
              required
              type="text"
              :placeholder="$t('contact.subjectPlaceholder')"
              class="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-gold"
            />
          </div>

          <div class="space-y-1">
            <label class="font-bold text-slate-700 block">{{ $t('contact.message') }} *</label>
            <textarea
              v-model="form.message"
              required
              rows="5"
              :placeholder="$t('contact.messagePlaceholder')"
              class="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-gold"
            ></textarea>
          </div>

          <button
            type="submit"
            :disabled="submitting"
            class="w-full py-3.5 bg-gov-navy hover:bg-gov-navy-light text-white font-bold rounded-xl shadow-lg transition text-xs sm:text-sm flex items-center justify-center gap-2"
          >
            <span v-if="submitting">{{ $t('contact.sending') }}</span>
            <span v-else>{{ $t('contact.send') }}</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'ទំនាក់ទំនង | Contact - MPWT Department of IT Systems',
  description: 'Official contact details, address, Google Maps location, and online inquiry form for DITS MPWT.'
})

const submitting = ref(false)
const successMsg = ref(false)

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

async function submitInquiry() {
  submitting.value = true
  try {
    const res = await $fetch<{ success: boolean }>('/api/inquiries', {
      method: 'POST',
      body: form
    })
    if (res.success) {
      successMsg.value = true
      form.name = ''
      form.email = ''
      form.subject = ''
      form.message = ''
      setTimeout(() => (successMsg.value = false), 5000)
    }
  } catch (err) {
    console.error('Error submitting inquiry', err)
  } finally {
    submitting.value = false
  }
}
</script>
