<template>
  <div class="relative w-full text-left">
    <!-- Vuetify Outlined Field Wrapper -->
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
      <!-- Prepend / Prefix Icon -->
      <div v-if="$slots.prefix || icon" class="pl-3.5 pr-1 text-slate-400 group-focus-within:text-gov-navy shrink-0 transition-colors">
        <slot name="prefix">
          <svg v-if="icon === 'user'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <svg v-else-if="icon === 'mail'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <svg v-else-if="icon === 'phone'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h32a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
          </svg>
          <svg v-else-if="icon === 'lock'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <svg v-else-if="icon === 'photo' || icon === 'link'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <svg v-else-if="icon === 'search'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <svg v-else-if="icon === 'calendar'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <svg v-else-if="icon === 'tag'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <svg v-else-if="icon === 'percent'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </slot>
      </div>

      <!-- Input Field -->
      <input
        :id="inputId"
        :type="computedType"
        :value="modelValue"
        @input="onInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :placeholder="isFocused ? placeholder : ''"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
        :class="[
          'w-full bg-transparent border-0 px-3.5 py-2 text-slate-900 focus:outline-none focus:ring-0 font-sans',
          fontKhmer ? 'font-khmer' : '',
          fontMono ? 'font-mono' : ''
        ]"
      />

      <!-- Vuetify Floating Label -->
      <label
        v-if="label"
        :for="inputId"
        :class="[
          'absolute pointer-events-none transition-all duration-200 transform origin-left px-1.5 font-medium bg-white rounded-md',
          isFloating
            ? '-top-3 text-xs font-bold text-gov-navy shadow-xs border border-slate-100'
            : (icon || $slots.prefix)
            ? 'left-10 text-sm text-slate-400'
            : 'left-3.5 text-sm text-slate-400',
          error && isFloating ? 'text-rose-600' : ''
        ]"
      >
        <span>{{ label }}</span>
        <span v-if="required" class="text-rose-500 ml-0.5 font-bold">*</span>
      </label>

      <!-- Clear Icon -->
      <button
        v-if="clearable && modelValue && !disabled"
        type="button"
        @click="clearInput"
        class="mr-2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Password Toggle -->
      <button
        v-if="type === 'password'"
        type="button"
        @click="showPassword = !showPassword"
        class="mr-3 p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
      >
        <svg v-if="!showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a8.962 8.962 0 013.98-.938c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21f-9 9 0 00-9-9" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />
        </svg>
      </button>
    </div>

    <!-- Error / Helper Details -->
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

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    label?: string
    type?: string
    placeholder?: string
    icon?: string
    error?: string
    helperText?: string
    hint?: string
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    clearable?: boolean
    fontKhmer?: boolean
    fontMono?: boolean
    size?: 'sm' | 'md' | 'lg'
    min?: number | string
    max?: number | string
    step?: number | string
  }>(),
  {
    modelValue: '',
    type: 'text',
    size: 'md',
    disabled: false,
    readonly: false,
    required: false,
    clearable: false,
    fontKhmer: false,
    fontMono: false
  }
)

const emit = defineEmits(['update:modelValue', 'change', 'clear'])

const inputId = `v-input-${Math.random().toString(36).substring(2, 9)}`
const isFocused = ref(false)
const showPassword = ref(false)

const isFloating = computed(() => {
  return isFocused.value || props.modelValue !== '' && props.modelValue !== null && props.modelValue !== undefined
})

const computedType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

function onInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  emit('update:modelValue', val)
}

function clearInput() {
  emit('update:modelValue', '')
  emit('clear')
}
</script>
