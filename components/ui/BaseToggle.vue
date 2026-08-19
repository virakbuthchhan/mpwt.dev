<template>
  <label class="flex items-center justify-between gap-4 cursor-pointer select-none group">
    <div>
      <span class="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-gov-navy transition block">
        {{ label }}
      </span>
      <span v-if="description" class="text-[11px] text-slate-500 block leading-tight">
        {{ description }}
      </span>
    </div>

    <div class="relative shrink-0">
      <input
        type="checkbox"
        :checked="modelValue"
        @change="onChange"
        :disabled="disabled"
        class="sr-only peer"
      />
      <div
        class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gov-navy/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gov-navy shadow-inner"
      ></div>
    </div>
  </label>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    label: string
    description?: string
    disabled?: boolean
  }>(),
  {
    modelValue: false,
    disabled: false
  }
)

const emit = defineEmits(['update:modelValue', 'change'])

function onChange(e: Event) {
  const val = (e.target as HTMLInputElement).checked
  emit('update:modelValue', val)
  emit('change', val)
}
</script>
