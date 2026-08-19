<template>
  <div class="space-y-1.5 w-full">
    <!-- Label -->
    <div v-if="label || $slots.label || hint" class="flex items-center justify-between">
      <label v-if="label" :for="dateId" class="block text-xs font-bold text-slate-700 tracking-wide flex items-center gap-1">
        <span>{{ label }}</span>
        <span v-if="required" class="text-rose-500 font-bold">*</span>
      </label>
      <span v-if="hint" class="text-[11px] text-slate-400 font-medium">{{ hint }}</span>
    </div>

    <!-- Date Input Wrapper -->
    <div
      :class="[
        'relative flex items-center rounded-xl border transition-all duration-200 shadow-sm bg-white',
        error
          ? 'border-rose-400 focus-within:border-rose-500 focus-within:ring-4 focus-within:ring-rose-500/15'
          : 'border-slate-200 hover:border-slate-300 focus-within:border-gov-navy focus-within:ring-4 focus-within:ring-gov-navy/10',
        disabled ? 'bg-slate-50 opacity-60 cursor-not-allowed' : '',
        size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-4 py-3 text-base' : 'px-3.5 py-2.5 text-xs sm:text-sm'
      ]"
    >
      <div class="mr-2 text-gov-gold shrink-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      <input
        :id="dateId"
        type="date"
        :value="modelValue"
        @input="onInput"
        :min="min"
        :max="max"
        :disabled="disabled"
        :required="required"
        class="w-full bg-transparent border-0 p-0 text-slate-800 focus:outline-none focus:ring-0 text-xs sm:text-sm font-mono font-medium cursor-pointer"
      />
    </div>

    <!-- Error or Helper -->
    <p v-if="error" class="text-[11px] text-rose-500 font-medium flex items-center gap-1">
      <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ error }}</span>
    </p>
    <p v-else-if="helperText" class="text-[11px] text-slate-400">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string
    label?: string
    error?: string
    helperText?: string
    hint?: string
    disabled?: boolean
    required?: boolean
    min?: string
    max?: string
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    modelValue: '',
    size: 'md',
    disabled: false,
    required: false
  }
)

const emit = defineEmits(['update:modelValue'])

const dateId = `date-${Math.random().toString(36).substring(2, 9)}`

function onInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  emit('update:modelValue', val)
}
</script>
