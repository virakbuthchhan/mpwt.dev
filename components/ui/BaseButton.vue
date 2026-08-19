<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 active:scale-[0.98] shadow-sm select-none',
      variant === 'primary' ? 'bg-gov-navy hover:bg-gov-navy-light text-white shadow-gov-navy/20' : '',
      variant === 'gold' ? 'bg-gov-gold hover:bg-gov-gold-light text-gov-navy shadow-gov-gold/20' : '',
      variant === 'secondary' ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : '',
      variant === 'outline' ? 'border border-slate-300 hover:bg-slate-50 text-slate-700' : '',
      variant === 'danger' ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20' : '',
      size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : 'px-4.5 py-2.5 text-xs sm:text-sm',
      (disabled || loading) ? 'opacity-60 cursor-not-allowed transform-none shadow-none' : 'hover:shadow-md'
    ]"
  >
    <svg v-if="loading" class="animate-spin -ml-1 mr-1.5 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>

    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'gold' | 'secondary' | 'outline' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    type: 'button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false
  }
)
</script>
