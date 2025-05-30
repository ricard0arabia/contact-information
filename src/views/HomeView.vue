<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold">Customer Information</h1>
      <button
        @click="openAddModal"
        class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        Add New Customer
      </button>
    </div>

    <div class="flex justify-end mb-2">
      <button @click="view = 'table'" class="mr-2">📋</button>
      <button @click="view = 'card'">📇</button>
    </div>

    <CustomerModal
      :visible="showModal"
      :isEditMode="isEdit"
      :initialData="selectedContact"
      @submit="handleSubmit"
      @close="handleClose"
    />

    <component :is="currentView" :customers="customers" @openEditModal="openEditModal" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TableView from './TableView.vue'
import CardView from './CardView.vue'
import { getTableDataApi } from '@@/apis/tables'
import CustomerModal from '@/components/CustomerModal.vue'

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

const showModal = ref(false)
const isEdit = ref(false)
const selectedContact = ref(null)

function openAddModal() {
  isEdit.value = false
  selectedContact.value = null
  showModal.value = true
}

function openEditModal(contact) {
  isEdit.value = true
  selectedContact.value = contact
  showModal.value = true

  console.log('Selected contact for edit:', contact)
}

function handleSubmit(data) {
  console.log('laman ng data', data)
  if (isEdit.value) {
    // update contact
  } else {
    // add contact
  }
}

function handleClose() {
  showModal.value = false
}
</script>
