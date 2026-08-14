<template>
  <div class="border border-slate-300 rounded-lg overflow-hidden bg-white">
    <!-- Toolbar -->
    <div class="bg-slate-100 p-2 border-b border-slate-300 flex flex-wrap items-center gap-1 text-xs">
      <button
        type="button"
        @click="exec('bold')"
        class="px-2 py-1 bg-white hover:bg-slate-200 rounded font-bold border border-slate-300"
        title="Bold"
      >
        B
      </button>
      <button
        type="button"
        @click="exec('italic')"
        class="px-2 py-1 bg-white hover:bg-slate-200 rounded italic font-serif border border-slate-300"
        title="Italic"
      >
        I
      </button>

      <div class="w-px h-5 bg-slate-300 mx-1"></div>

      <button
        type="button"
        @click="exec('insertUnorderedList')"
        class="px-2 py-1 bg-white hover:bg-slate-200 rounded border border-slate-300"
        title="Bullet List"
      >
        • List
      </button>
      <button
        type="button"
        @click="exec('insertOrderedList')"
        class="px-2 py-1 bg-white hover:bg-slate-200 rounded border border-slate-300"
        title="Numbered List"
      >
        1. List
      </button>

      <div class="w-px h-5 bg-slate-300 mx-1"></div>

      <button
        type="button"
        @click="toggleMode"
        class="px-2.5 py-1 bg-gov-navy text-white hover:bg-gov-navy-light rounded font-mono text-[11px] ml-auto"
      >
        {{ isHtmlMode ? 'WYSIWYG Mode' : 'HTML Code' }}
      </button>
    </div>

    <!-- WYSIWYG Editable area -->
    <div
      v-if="!isHtmlMode"
      ref="editorRef"
      contenteditable="true"
      @input="handleInput"
      class="p-4 min-h-[160px] focus:outline-none text-xs sm:text-sm text-slate-800 leading-relaxed max-w-none prose"
    ></div>

    <!-- HTML Raw textarea mode -->
    <textarea
      v-else
      v-model="rawContent"
      @input="handleRawInput"
      rows="6"
      class="w-full p-4 font-mono text-xs text-slate-900 focus:outline-none bg-slate-900 text-emerald-400"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])

const editorRef = ref<HTMLDivElement | null>(null)
const isHtmlMode = ref(false)
const rawContent = ref(props.modelValue || '')

watch(
  () => props.modelValue,
  (val) => {
    if (editorRef.value && editorRef.value.innerHTML !== val) {
      editorRef.value.innerHTML = val || ''
    }
    rawContent.value = val || ''
  }
)

onMounted(() => {
  if (editorRef.value) {
    editorRef.value.innerHTML = props.modelValue || ''
  }
})

function handleInput() {
  if (editorRef.value) {
    const html = editorRef.value.innerHTML
    rawContent.value = html
    emit('update:modelValue', html)
  }
}

function handleRawInput() {
  emit('update:modelValue', rawContent.value)
}

function exec(command: string) {
  document.execCommand(command, false)
  handleInput()
}

function toggleMode() {
  isHtmlMode.value = !isHtmlMode.value
  if (!isHtmlMode.value && editorRef.value) {
    nextTick(() => {
      if (editorRef.value) editorRef.value.innerHTML = rawContent.value
    })
  }
}
</script>
