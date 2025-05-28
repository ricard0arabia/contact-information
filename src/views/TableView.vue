<template>
  <table class="min-w-full table-auto border border-gray-200">
    <thead class="bg-indigo-900 text-white">
      <tr>
        <th class="px-4 py-2 text-left">Name</th>
        <th class="px-4 py-2 text-left">Contact Number</th>
        <th class="px-4 py-2 text-left">Email Address</th>
        <th class="px-4 py-2 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(customer, index) in customers" :key="index" class="border-t">
        <td class="px-4 py-2">{{ customer.username }}</td>
        <td class="px-4 py-2">{{ customer.phone }}</td>
        <td class="px-4 py-2">{{ customer.email }}</td>
        <td class="px-4 py-2">
          <button class="mr-2 text-indigo-500 hover:underline">✏️</button>
          <button class="text-red-500 hover:underline">🗑️</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps(['customers'])
</script>
