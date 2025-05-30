<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-700/70 flex justify-center items-center z-50">
    <div class="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
      <h2 class="text-xl font-semibold mb-4">
        {{ isEditMode ? 'Update Contact Information' : 'Add New Contact Information' }}
      </h2>

      <Form @submit="onSubmit" :validation-schema="schema" :initial-values="form">
        <div class="mb-4">
          <label for="username" class="block font-medium mb-1">Name</label>
          <Field name="username" v-slot="{ field, meta }">
            <input
              v-bind="field"
              type="text"
              :class="[
                'w-full border rounded px-3 py-2 focus:outline-none',
                meta.touched && !meta.valid ? 'border-red-500' : 'border-gray-300',
              ]"
            />
          </Field>
          <ErrorMessage name="username" class="text-red-500 text-sm mt-1" />
        </div>

        <div class="mb-4">
          <label for="contactNumber" class="block font-medium mb-1">Contact Number</label>
          <Field name="contactNumber" v-slot="{ field, meta }">
            <input
              v-bind="field"
              type="tel"
              :class="[
                'w-full border rounded px-3 py-2 focus:outline-none',
                meta.touched && !meta.valid ? 'border-red-500' : 'border-gray-300',
              ]"
            />
          </Field>
          <ErrorMessage name="contactNumber" class="text-red-500 text-sm mt-1" />
        </div>

        <div class="mb-4">
          <label for="email" class="block font-medium mb-1">Email address</label>
          <Field name="email" v-slot="{ field, meta }">
            <input
              v-bind="field"
              type="email"
              :class="[
                'w-full border rounded px-3 py-2 focus:outline-none',
                meta.touched && !meta.valid ? 'border-red-500' : 'border-gray-300',
              ]"
            />
          </Field>
          <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 rounded border border-purple-500 text-purple-600 hover:bg-purple-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
          >
            {{ isEditMode ? 'Save Changes' : 'Add Contact' }}
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, defineEmits, defineProps } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

interface ContactForm {
  username: string
  contactNumber: string
  email: string
}

const props = defineProps<{
  visible: boolean
  isEditMode: boolean
  initialData?: ContactForm
}>()

const emit = defineEmits(['close', 'submit'])

const form = reactive<ContactForm>({
  username: '',
  contactNumber: '',
  email: '',
})

// const errors = reactive({
//   contactNumber: '',
// })

watch(
  () => props.initialData,
  (newVal) => {
    if (props.isEditMode && newVal) {
      Object.assign(form, newVal)
    } else {
      Object.assign(form, { username: '', contactNumber: '', email: '' })
    }
  },
  { immediate: true },
)

// function validate(): boolean {
//   let isValid = true
//   errors.contactNumber = ''

//   if (!form.contactNumber.trim()) {
//     errors.contactNumber = 'Please enter a contact number.'
//     isValid = false
//   }

//   return isValid
// }

// function handleSubmit() {
//   if (!validate()) return
//   emit('submit', { ...form })
//   closeModal()
// }

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object({
  username: yup.string().required().label('Name'),
  contactNumber: yup
    .string()
    .required()
    .matches(phoneRegExp, 'Phone number is not valid')
    .label('Contact number'),
  email: yup.string().required().email().label('Email address'),
})

function onSubmit(values) {
  // Submit values to API...
  alert(JSON.stringify(values, null, 2))
}

function closeModal() {
  emit('close')
}
</script>

<style scoped>
input:focus {
  outline: none;
  border-color: #7c3aed;
}
</style>
