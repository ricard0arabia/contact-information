<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      v-for="(customer, index) in customers"
      :key="index"
      class="p-4 border border-gray-300 rounded-lg shadow-sm"
    >
      <div class="font-semibold text-lg">{{ customer.name }}</div>
      <div class="text-sm text-gray-600">{{ customer.email }}</div>
      <div class="text-sm text-gray-600">{{ customer.phone }}</div>
      <div class="mt-2 flex space-x-2">
        <button class="text-indigo-500">✏️</button>
        <button class="text-red-500">🗑️</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['customers'])
</script>
