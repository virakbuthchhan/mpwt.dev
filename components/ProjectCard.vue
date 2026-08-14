<template>
  <div class="glass-card rounded-3xl shadow-sm border border-white/60 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-1">
    <div class="space-y-4">
      <div class="flex items-start justify-between gap-3">
        <span
          :class="[
            'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md shadow-sm',
            project.status === 'Completed' ? 'bg-emerald-50/80 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800' : '',
            project.status === 'In Progress' ? 'bg-sky-50/80 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-800' : '',
            project.status === 'Planning' ? 'bg-amber-50/80 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800' : ''
          ]"
        >
          {{ statusText }}
        </span>

        <span class="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
          <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ project.timeline }}
        </span>
      </div>

      <h3 class="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug group-hover:text-gov-navy dark:group-hover:text-gov-gold transition font-khmer">
        {{ title }}
      </h3>

      <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        {{ description }}
      </p>

      <!-- Progress Bar -->
      <div class="space-y-2 pt-2">
        <div class="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
          <span>{{ $t('projects.progress') }}</span>
          <span class="font-mono text-gov-navy dark:text-gov-gold font-bold">{{ project.progress }}%</span>
        </div>
        <div class="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
          <div
            class="h-full bg-gov-navy dark:bg-gov-gold transition-all duration-500 rounded-full shadow-inner"
            :style="{ width: `${project.progress}%` }"
          ></div>
        </div>
      </div>
    </div>

    <div class="mt-6 pt-4 border-t border-slate-100/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
      <span class="font-semibold flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
        <svg class="w-4 h-4 text-gov-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0L9 14m3-3l3 3m-3-3v8" />
        </svg>
        <span>{{ unit }}</span>
      </span>
      <span class="font-mono text-slate-400">Year: {{ project.year }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectItem } from '~/server/utils/db'

const props = defineProps<{ project: ProjectItem }>()
const { locale, t } = useI18n()

const title = computed(() => (locale.value === 'km' ? props.project.titleKh : props.project.titleEn))
const description = computed(() => (locale.value === 'km' ? props.project.descriptionKh : props.project.descriptionEn))
const unit = computed(() => (locale.value === 'km' ? props.project.unitKh : props.project.responsibleUnit))

const statusText = computed(() => {
  if (props.project.status === 'Completed') return t('projects.statusCompleted')
  if (props.project.status === 'In Progress') return t('projects.statusInProgress')
  return t('projects.statusPlanning')
})
</script>
