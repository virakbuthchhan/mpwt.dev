<template>
  <div class="bg-white rounded-xl shadow-md border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition">
    <div class="space-y-4">
      <div class="flex items-start justify-between gap-3">
        <span
          :class="[
            'px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
            project.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : '',
            project.status === 'In Progress' ? 'bg-blue-100 text-blue-800 border border-blue-300' : '',
            project.status === 'Planning' ? 'bg-amber-100 text-amber-800 border border-amber-300' : ''
          ]"
        >
          {{ statusText }}
        </span>

        <span class="text-xs font-mono text-slate-500 font-semibold">
          {{ project.timeline }}
        </span>
      </div>

      <h3 class="text-base font-bold text-slate-900 leading-snug">
        {{ title }}
      </h3>

      <p class="text-xs text-slate-600 leading-relaxed">
        {{ description }}
      </p>

      <!-- Progress Bar -->
      <div class="space-y-1.5 pt-2">
        <div class="flex items-center justify-between text-xs font-semibold text-slate-700">
          <span>{{ $t('projects.progress') }}</span>
          <span>{{ project.progress }}%</span>
        </div>
        <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div
            class="h-full bg-gov-navy transition-all duration-500 rounded-full"
            :style="{ width: `${project.progress}%` }"
          ></div>
        </div>
      </div>
    </div>

    <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
      <span class="font-medium">🏛 {{ unit }}</span>
      <span class="font-mono">Year: {{ project.year }}</span>
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
