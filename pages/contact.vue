<template>
  <div class="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-3xl mx-auto">
      <span class="text-xs font-bold text-gov-gold uppercase tracking-widest bg-gov-navy/5 px-3 py-1 rounded-full border border-gov-gold/30">
        Inquiry & Support
      </span>
      <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 font-khmer">
        {{ $t('contact.title') }}
      </h1>
      <p class="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
        {{ $t('contact.subtitle') }}
      </p>
      <div class="w-20 h-1 bg-gov-gold mx-auto rounded-full"></div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Contact Info Card & Map -->
      <div class="lg:col-span-5 space-y-6">
        <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-5">
          <h3 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <svg class="w-5 h-5 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{{ $t('contact.address') }}</span>
          </h3>

          <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            {{ $t('contact.addressText') }}
          </p>

          <div class="space-y-3 pt-3 border-t border-slate-100 text-xs sm:text-sm">
            <div class="flex items-center gap-3 text-slate-700">
              <svg class="w-4 h-4 text-gov-navy shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h32a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
              </svg>
              <span class="font-mono text-xs">+855 23 888 100</span>
            </div>
            <div class="flex items-center gap-3 text-slate-700">
              <svg class="w-4 h-4 text-gov-navy shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="font-mono text-xs">dits@mpwt.gov.kh</span>
            </div>
            <div class="flex items-center gap-3 text-slate-700">
              <svg class="w-4 h-4 text-gov-navy shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Mon - Fri: 8:00 AM - 5:00 PM</span>
            </div>
          </div>
        </div>

        <!-- Google Maps Frame -->
        <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 h-64">
          <iframe
            title="MPWT Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.7758364812316!2d104.9012456!3d11.6038166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951664d4b1a43%3A0xb36b567d16a54625!2sMinistry%20of%20Public%20Works%20and%20Transport!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh"
            class="w-full h-full border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <!-- Inquiry Form -->
      <div class="lg:col-span-7 bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
        <h3 class="text-xl font-bold text-slate-900 font-khmer border-b border-slate-100 pb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>{{ $t('contact.inquiryForm') }}</span>
        </h3>

        <div v-if="successMsg" class="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-bold">
          ✓ {{ $t('contact.successMessage') }}
        </div>

        <form @submit.prevent="submitInquiry" class="space-y-4 text-xs sm:text-sm font-sans">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="font-bold text-slate-700 block">{{ $t('contact.name') }} *</label>
              <input
                v-model="form.name"
                required
                type="text"
                :placeholder="$t('contact.namePlaceholder')"
                class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-gov-gold"
              />
            </div>
            <div class="space-y-1.5">
              <label class="font-bold text-slate-700 block">{{ $t('contact.email') }} *</label>
              <input
                v-model="form.email"
                required
                type="email"
                :placeholder="$t('contact.emailPlaceholder')"
                class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-gov-gold"
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="font-bold text-slate-700 block">{{ $t('contact.subject') }} *</label>
            <input
              v-model="form.subject"
              required
              type="text"
              :placeholder="$t('contact.subjectPlaceholder')"
              class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-gov-gold"
            />
          </div>

          <div class="space-y-1.5">
            <label class="font-bold text-slate-700 block">{{ $t('contact.message') }} *</label>
            <textarea
              v-model="form.message"
              required
              rows="5"
              :placeholder="$t('contact.messagePlaceholder')"
              class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-gov-gold"
            ></textarea>
          </div>

          <button
            type="submit"
            :disabled="submitting"
            class="w-full py-4 bg-gov-navy hover:bg-slate-800 text-white font-bold rounded-2xl shadow-lg transition text-xs sm:text-sm flex items-center justify-center gap-2"
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
