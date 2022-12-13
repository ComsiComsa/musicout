<template>
  <div class="w-full max-w-md space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create new account</h2>
      <p class="mt-2 text-center text-sm text-gray-600" />
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">sing in</router-link>
      </p>
    </div>

    <vee-form
        :validation-schema="validationSchema"
        @submit="onSubmit"
    >
      <div
          v-if="submitAlert.visible"
          class="text-white text-center fond-bold p-4 rounded mb-4"
          :class="submitAlert.class"
      >
        {{ submitAlert.message }}
      </div>

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
            type="password"
            name="password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Password"
        />
        <ErrorMessage name="password" class="text-red-600" />
      </div>

      <div class="mb-3">
        <label class="inline-block mb-2">Confirm Password</label>
        <vee-field
            type="password"
            name="confirmPassword"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Confirm Password"
        />
        <ErrorMessage name="confirmPassword" class="text-red-600" />
      </div>

      <div class="mb-3">
        <label class="inline-block mb-2">Name</label>
        <vee-field
            name="name"
            type="name"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter your name"
        />
        <ErrorMessage name="name" class="text-red-600" />
      </div>

      <div class="mb-3">
        <label class="inline-block mb-2">Age</label>
        <vee-field
            name="age"
            type="number"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter your age"
        />
        <ErrorMessage name="age" class="text-red-600" />
      </div>

      <div class="mb-3 pl-6">
        <vee-field
            value="1"
            name="tos"
            type="checkbox"
            class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        />
        <label class="inline-block">Accept terms of service</label>
        <ErrorMessage name="tos" class="text-red-600 block" />
      </div>

      <button
          type="submit"
          class="block w-full bg-purple-600 text-white py-1.5 px-3 mt-6 rounded transition hover:bg-purple-700"
          :disabled="submitting"
      >
        Register
      </button>
    </vee-form>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Register',
  setup () {
    /*
      variables
     */

    const userStore = useUserStore()
    const router = useRouter()

    const submitting = ref(false)
    const submitAlert = reactive({
      visible: false,
      class: 'bg-blue-500',
      message: 'Please wait! Your account is being created.'
    })

    const validationSchema = ref({
      email: 'required|email',
      password: 'required',
      confirmPassword: 'confirmed:@password',
      name: 'required|alphaSpaces',
      age: 'required|min_value:10|max_value:100',
      tos: 'tos'
    })

    /*
      methods
     */

    const onSubmit = async (form) => {
      submitting.value = true

      submitAlert.visible = true
      submitAlert.class = 'bg-blue-500'
      submitAlert.message = 'Please wait! Your account is being created.'

      userStore.register(form)
          .then(() => {
            submitAlert.class = 'bg-green-500'
            submitAlert.message = 'Success! Your account has been created.'

            setTimeout(() => {
              console.log('BIM BIM')
              router.push('/login')
            }, 500)
          })
          .catch((error) => {
            submitAlert.class = 'bg-red-500'
            submitAlert.message = error.message.includes('email-already-in-use') ?
                'This email already exists' :'An unexpected error occurred. Please try again later.'
          })
          .finally(() => {
            submitting.value = false
          })
    }

    return {
      submitAlert,
      submitting,
      validationSchema,
      onSubmit
    }
  }
}
</script>