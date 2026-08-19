<template>
  <!-- Vuetify Style Data Table Card -->
  <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md">
    <!-- Vuetify Toolbar Header -->
    <div class="p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/60">
      <div class="w-full sm:w-80">
        <BaseInput
          v-model="searchQuery"
          placeholder="Search records..."
          icon="search"
          clearable
          size="sm"
        />
      </div>

      <div class="flex items-center gap-3">
        <span class="text-xs font-mono text-slate-500 font-medium">
          Showing <strong>{{ filteredItems.length }}</strong> of {{ items.length }} items
        </span>

        <BaseButton
          v-if="canEdit"
          @click="$emit('create')"
          variant="primary"
          size="sm"
          class="shadow-sm"
        >
          <template #icon-left>
            <svg class="w-4 h-4 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </template>
          <span>{{ $t('admin.create') }}</span>
        </BaseButton>
      </div>
    </div>

    <!-- Data Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse text-xs">
        <thead class="bg-slate-100/80 text-slate-700 uppercase font-bold text-[10.5px] tracking-wider border-b border-slate-200">
          <tr>
            <th v-for="col in columns" :key="col.key" class="py-3.5 px-5 select-none">
              <div class="flex items-center gap-1">
                <span>{{ col.label }}</span>
              </div>
            </th>
            <th class="py-3.5 px-5 text-right">{{ $t('admin.actions') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-slate-800">
          <tr v-if="filteredItems.length === 0">
            <td :colspan="columns.length + 1" class="py-12 text-center text-slate-400 font-medium space-y-2">
              <svg class="w-10 h-10 mx-auto text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <div>No matching records found.</div>
            </td>
          </tr>

          <tr
            v-for="item in filteredItems"
            :key="item.id"
            class="hover:bg-blue-50/40 transition-colors duration-150 group"
          >
            <td v-for="col in columns" :key="col.key" class="py-3.5 px-5 max-w-xs truncate">
              <slot :name="`col-${col.key}`" :item="item">
                {{ item[col.key] }}
              </slot>
            </td>
            <td class="py-3.5 px-5 text-right space-x-1.5 shrink-0">
              <button
                v-if="canEdit"
                @click="$emit('edit', item)"
                class="p-2 text-amber-600 hover:text-amber-800 hover:bg-amber-100/70 rounded-xl transition inline-flex items-center gap-1 font-bold text-[11px] border border-amber-200/60"
                title="Edit item"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit</span>
              </button>

              <button
                v-if="canDelete"
                @click="$emit('delete', item)"
                class="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-100/70 rounded-xl transition inline-flex items-center gap-1 font-bold text-[11px] border border-rose-200/60"
                title="Delete item"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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
