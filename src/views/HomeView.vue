<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold">Customer Information</h1>
      <button class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
        Add New Customer
      </button>
    </div>

    <div class="flex justify-end mb-2">
      <button @click="view = 'table'" class="mr-2">📋</button>
      <button @click="view = 'card'">📇</button>
    </div>

    <component :is="currentView" :customers="customers" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TableView from './TableView.vue'
import CardView from './CardView.vue'
import { getTableDataApi } from '@@/apis/tables'

const view = ref('table')
const isLoading = ref(true)
const error = ref(null)
const customers = ref([])

onMounted(async () => {
  try {
    const response = await getTableDataApi({
      _page: 1,
      _per_page: 10,
    })
    customers.value = response.data
  } catch (err) {
    error.value = err.message || 'Failed to load users'
  } finally {
    isLoading.value = false
  }
})

const currentView = computed(() => (view.value === 'table' ? TableView : CardView))
</script>
