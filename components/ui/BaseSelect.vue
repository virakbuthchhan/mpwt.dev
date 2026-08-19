<template>
  <div class="relative w-full text-left">
    <!-- Vuetify Outlined Select Box Wrapper -->
    <div
      :class="[
        'relative flex items-center rounded-xl border-2 transition-all duration-200 bg-white group',
        isFocused
          ? 'border-gov-navy ring-4 ring-gov-navy/10 shadow-md'
          : error
          ? 'border-rose-500 ring-4 ring-rose-500/10'
          : 'border-slate-200 hover:border-slate-400 shadow-sm',
        disabled ? 'bg-slate-50 opacity-60 cursor-not-allowed' : '',
        size === 'sm' ? 'h-10 text-xs' : size === 'lg' ? 'h-14 text-base' : 'h-12 text-sm'
      ]"
    >
      <div v-if="icon" class="pl-3.5 pr-1 text-slate-400 group-focus-within:text-gov-navy shrink-0 transition-colors">
        <svg v-if="icon === 'building'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0L9 14m3-3l3 3m-3-3v8" />
        </svg>
        <svg v-else-if="icon === 'status'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg v-else-if="icon === 'folder'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      </div>

      <select
        :id="selectId"
        :value="modelValue"
        @change="onChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :disabled="disabled"
        :required="required"
        :class="[
          'w-full bg-transparent border-0 px-3.5 py-2 text-slate-900 focus:outline-none focus:ring-0 appearance-none font-semibold cursor-pointer pr-8 text-xs sm:text-sm font-sans',
          fontKhmer ? 'font-khmer' : '',
          fontMono ? 'font-mono' : ''
        ]"
      >
        <option v-if="placeholder || !modelValue" value="" disabled selected class="text-slate-400">
          {{ placeholder || 'Select an option' }}
        </option>
        <option
          v-for="(opt, idx) in normalizedOptions"
          :key="idx"
          :value="opt.value"
          class="text-slate-800 font-medium py-1.5"
        >
          {{ opt.label }}
        </option>
      </select>

      <!-- Vuetify Floating Label -->
      <label
        v-if="label"
        :for="selectId"
        :class="[
          'absolute pointer-events-none transition-all duration-200 transform origin-left px-1.5 font-medium bg-white rounded-md',
          isFloating
            ? '-top-3 text-xs font-bold text-gov-navy shadow-xs border border-slate-100'
            : icon
            ? 'left-10 text-sm text-slate-400'
            : 'left-3.5 text-sm text-slate-400',
          error && isFloating ? 'text-rose-600' : ''
        ]"
      >
        <span>{{ label }}</span>
        <span v-if="required" class="text-rose-500 ml-0.5 font-bold">*</span>
      </label>

      <!-- Chevron Arrow Icon -->
      <div class="absolute right-3.5 pointer-events-none text-slate-400 group-focus-within:text-gov-navy transition-transform duration-200">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <!-- Error or Helper Details -->
    <div v-if="error || helperText || hint" class="mt-1 flex items-center justify-between text-[11px] px-1">
      <span v-if="error" class="text-rose-500 font-medium flex items-center gap-1">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ error }}
      </span>
      <span v-else-if="helperText" class="text-slate-400">{{ helperText }}</span>
      <span v-if="hint" class="text-slate-400 ml-auto font-mono text-[10px]">{{ hint }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    options: (string | SelectOption)[]
    label?: string
    placeholder?: string
    icon?: string
    error?: string
    helperText?: string
    hint?: string
    disabled?: boolean
    required?: boolean
    fontKhmer?: boolean
    fontMono?: boolean
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    modelValue: '',
    size: 'md',
    disabled: false,
    required: false,
    fontKhmer: false,
    fontMono: false
  }
)

const emit = defineEmits(['update:modelValue', 'change'])

const selectId = `v-select-${Math.random().toString(36).substring(2, 9)}`
const isFocused = ref(false)

const isFloating = computed(() => {
  return isFocused.value || props.modelValue !== '' && props.modelValue !== null && props.modelValue !== undefined
})

const normalizedOptions = computed<SelectOption[]>(() => {
  return props.options.map(opt => {
    if (typeof opt === 'string') {
      return { label: opt, value: opt }
    }
    return opt
  })
})

function onChange(e: Event) {
  const val = (e.target as HTMLSelectElement).value
  emit('update:modelValue', val)
  emit('change', val)
}
</script>
