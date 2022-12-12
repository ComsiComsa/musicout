<template>
  <div class="w-full max-w-md space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      <p class="mt-2 text-center text-sm text-gray-600" />
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">create new account</router-link>
      </p>
    </div>

    <vee-form
        :validation-schema="validationSchema"
        @submit="onSubmit"
    >
      <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <vee-field
            name="email"
            type="email"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Email"
        />
        <ErrorMessage name="email" class="text-red-600" />
      </div>

      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <vee-field
            name="password"
            type="password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Password"
        />
        <ErrorMessage name="password" class="text-red-600" />
      </div>

      <button
          type="submit"
          class="block w-full bg-purple-600 text-white mt-6 py-1.5 px-3 rounded transition hover:bg-purple-700"
          :disabled="submitting"
      >
        Login
      </button>
    </vee-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

export default {
  name: 'Login',
  setup () {
    /*
      variables
     */

    const userStore = useUserStore()
    const submitting = ref(false)

    const validationSchema = ref({
      email: 'required|email',
      password: 'required',
    })

    /*
      methods
     */

    const onSubmit = (form) => {
      submitting.value = true

      userStore.login(form)
    }

    return {
      submitting,
      validationSchema,
      onSubmit
    }
  }
}
</script>