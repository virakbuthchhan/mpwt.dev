<template>
  <div class="border border-slate-300 rounded-xl overflow-hidden bg-white">
    <!-- Toolbar -->
    <div class="bg-slate-100 p-2 border-b border-slate-300 flex flex-wrap items-center gap-1.5 text-xs">
      <button
        type="button"
        @click="exec('bold')"
        class="px-2.5 py-1 bg-white hover:bg-slate-200 rounded-lg font-bold border border-slate-300 shadow-sm"
        title="Bold"
      >
        B
      </button>
      <button
        type="button"
        @click="exec('italic')"
        class="px-2.5 py-1 bg-white hover:bg-slate-200 rounded-lg italic font-serif border border-slate-300 shadow-sm"
        title="Italic"
      >
        I
      </button>

      <div class="w-px h-5 bg-slate-300 mx-1"></div>

      <button
        type="button"
        @click="exec('insertUnorderedList')"
        class="px-2.5 py-1 bg-white hover:bg-slate-200 rounded-lg border border-slate-300 font-semibold shadow-sm"
        title="Bullet List"
      >
        List
      </button>

      <button
        type="button"
        @click="toggleMode"
        class="px-3 py-1 bg-gov-navy text-white hover:bg-slate-800 rounded-lg font-mono text-[11px] font-bold ml-auto shadow"
      >
        {{ isHtmlMode ? 'WYSIWYG View' : 'HTML View' }}
      </button>
    </div>

    <!-- WYSIWYG Editable area -->
    <div
      v-if="!isHtmlMode"
      ref="editorRef"
      contenteditable="true"
      @input="handleInput"
      class="p-4 min-h-[180px] focus:outline-none text-xs sm:text-sm text-slate-800 leading-relaxed prose max-w-none font-sans"
    ></div>

    <!-- Raw HTML textarea -->
    <textarea
      v-else
      v-model="rawContent"
      @input="handleRawInput"
      rows="8"
      class="w-full p-4 font-mono text-xs focus:outline-none bg-slate-950 text-sky-300"
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
