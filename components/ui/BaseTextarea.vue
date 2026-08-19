<template>
  <div class="relative w-full text-left">
    <!-- Vuetify Outlined Textarea Wrapper -->
    <div
      :class="[
        'relative rounded-xl border-2 transition-all duration-200 bg-white group p-3',
        isFocused
          ? 'border-gov-navy ring-4 ring-gov-navy/10 shadow-md'
          : error
          ? 'border-rose-500 ring-4 ring-rose-500/10'
          : 'border-slate-200 hover:border-slate-400 shadow-sm',
        disabled ? 'bg-slate-50 opacity-60 cursor-not-allowed' : ''
      ]"
    >
      <textarea
        :id="textareaId"
        :value="modelValue"
        @input="onInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :placeholder="isFocused ? placeholder : ''"
        :rows="rows"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :maxlength="maxlength"
        :class="[
          'w-full bg-transparent border-0 p-0 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 text-xs sm:text-sm font-sans resize-y leading-relaxed mt-1',
          fontKhmer ? 'font-khmer' : '',
          fontMono ? 'font-mono' : ''
        ]"
      ></textarea>

      <!-- Vuetify Floating Label -->
      <label
        v-if="label"
        :for="textareaId"
        :class="[
          'absolute left-3.5 pointer-events-none transition-all duration-200 transform origin-left px-1.5 font-medium bg-white rounded-md',
          isFloating
            ? '-top-3 text-xs font-bold text-gov-navy shadow-xs border border-slate-100'
            : 'top-3 text-sm text-slate-400',
          error && isFloating ? 'text-rose-600' : ''
        ]"
      >
        <span>{{ label }}</span>
        <span v-if="required" class="text-rose-500 ml-0.5 font-bold">*</span>
      </label>

      <!-- Character Counter Badge -->
      <span
        v-if="maxlength && showCounter"
        class="absolute right-3 bottom-2 text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded"
      >
        {{ String(modelValue || '').length }}/{{ maxlength }}
      </span>
    </div>

    <!-- Error or Helper Details -->
    <div v-if="error || helperText" class="mt-1 flex items-center justify-between text-[11px] px-1">
      <span v-if="error" class="text-rose-500 font-medium flex items-center gap-1">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ error }}
      </span>
      <span v-else-if="helperText" class="text-slate-400">{{ helperText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    label?: string
    placeholder?: string
    rows?: number | string
    maxlength?: number | string
    showCounter?: boolean
    error?: string
    helperText?: string
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    fontKhmer?: boolean
    fontMono?: boolean
  }>(),
  {
    modelValue: '',
    rows: 3,
    showCounter: true,
    disabled: false,
    readonly: false,
    required: false,
    fontKhmer: false,
    fontMono: false
  }
)

const emit = defineEmits(['update:modelValue'])

const textareaId = `v-textarea-${Math.random().toString(36).substring(2, 9)}`
const isFocused = ref(false)

const isFloating = computed(() => {
  return isFocused.value || props.modelValue !== '' && props.modelValue !== null && props.modelValue !== undefined
})

function onInput(e: Event) {
  const val = (e.target as HTMLTextAreaElement).value
  emit('update:modelValue', val)
}
</script>
