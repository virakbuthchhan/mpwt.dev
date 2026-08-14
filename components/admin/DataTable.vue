<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
    <!-- Header Toolbar -->
    <div class="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
      <div class="relative w-full sm:w-72">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Filter records..."
          class="w-full pl-9 pr-4 py-2 bg-white text-xs text-slate-800 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-gov-gold font-sans"
        />
        <svg class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <button
        v-if="canEdit"
        @click="$emit('create')"
        class="px-4 py-2 bg-gov-navy hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow"
      >
        <svg class="w-4 h-4 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>{{ $t('admin.create') }}</span>
      </button>
    </div>

    <!-- Data Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse text-xs">
        <thead class="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
          <tr>
            <th v-for="col in columns" :key="col.key" class="p-4">
              {{ col.label }}
            </th>
            <th class="p-4 text-right">{{ $t('admin.actions') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-slate-800">
          <tr v-if="filteredItems.length === 0">
            <td :colspan="columns.length + 1" class="p-8 text-center text-slate-400 font-medium">
              No matching records found.
            </td>
          </tr>
          <tr v-for="item in filteredItems" :key="item.id" class="hover:bg-slate-50/80 transition">
            <td v-for="col in columns" :key="col.key" class="p-4 max-w-xs truncate">
              <slot :name="`col-${col.key}`" :item="item">
                {{ item[col.key] }}
              </slot>
            </td>
            <td class="p-4 text-right space-x-2 shrink-0">
              <button
                v-if="canEdit"
                @click="$emit('edit', item)"
                class="px-3 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg font-bold transition border border-amber-200 inline-flex items-center gap-1"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>{{ $t('admin.edit') }}</span>
              </button>

              <button
                v-if="canDelete"
                @click="$emit('delete', item)"
                class="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg font-bold transition border border-rose-200 inline-flex items-center gap-1"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>{{ $t('admin.delete') }}</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const props = defineProps<{
  columns: { key: string; label: string }[]
  items: any[]
}>()

defineEmits(['create', 'edit', 'delete'])

const { isEditor, isSuperAdmin } = useAuth()
const searchQuery = ref('')

const canEdit = computed(() => isEditor.value)
const canDelete = computed(() => isSuperAdmin.value)

const filteredItems = computed(() => {
  if (!searchQuery.value.trim()) return props.items
  const q = searchQuery.value.toLowerCase()
  return props.items.filter((item) =>
    Object.values(item).some((val) => String(val).toLowerCase().includes(q))
  )
})
</script>
