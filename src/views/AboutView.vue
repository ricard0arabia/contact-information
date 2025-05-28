<script setup>
import { ref, onMounted } from 'vue'
import { getTableDataApi } from '@@/apis/tables'

const users = ref([])
const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await getTableDataApi({
      _page: 1,
      _per_page: 10,
    })
    users.value = response.data
  } catch (err) {
    error.value = err.message || 'Failed to load users'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>

    

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Contact Number
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ user.username }}
                </th>
                <td class="px-6 py-4">
                    {{ user.phone }}
                </td>
                <td class="px-6 py-4">
                    {{ user.email }}
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>
