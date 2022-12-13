<template>
  <section class="container mx-auto mt-6">
    <div class="mt-10 sm:mt-0">
      <div>
        <div class="mt-5 md:col-span-2 md:mt-0">
          <vee-form
              @submit="onSubmit"
              :validation-schema="validationSchema"
          >
            <div class="overflow-hidden shadow sm:rounded-md">
              <div class="bg-white px-4 py-5 sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                    <vee-field
                        v-model="user.name"
                        :disabled="submitting || loadingUser"
                        type="text"
                        name="name"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage name="name" class="text-red-600" />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <vee-field
                        v-model="user.email"
                        type="email"
                        name="email"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        disabled
                    />
                    <ErrorMessage name="email" class="text-red-600" />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
                    <vee-field
                        v-model="user.age"
                        :disabled="submitting || loadingUser"
                        type="number"
                        name="age"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage name="age" class="text-red-600" />
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <span class="mr-3">Last update: {{ new Date(user.updated).toLocaleString() }}</span>
                <button
                    type="submit"
                    :disabled="submitting"
                    class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <i class="fas fa-spinner fa-spin mr-2 my-auto" v-if="submitting" /> Save
                </button>
              </div>
            </div>
          </vee-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';

import { useUserStore } from '@/stores/user';

export default {
  name: 'Profile',
  setup () {
    /*
      variables
     */

    const userStore = useUserStore()

    const loadingUser = ref(true)
    const submitting = ref(false)
    const user = ref({})

    const validationSchema = ref({
      email: 'required|email',
      name: 'required|alphaSpaces',
      age: 'required|min_value:10|max_value:100',
    })

    /*
      methods
     */

    const getUser = () => {
      loadingUser.value = true

      userStore.getUser()
          .then((response) => {
            user.value = response
          })
          .finally(() => {
            loadingUser.value = false
          })
    }
    const onSubmit = () => {
      submitting.value = true

      userStore.updateUser({ ...user.value })
          .finally(() => {
            getUser()
            submitting.value = false
          })
    }

    /*
      lifecycle hooks
     */

    onMounted(() => {
      getUser()
    })

    return {
      user,
      submitting,
      loadingUser,
      validationSchema,
      onSubmit
    }
  }
}
</script>

<style scoped>

</style>