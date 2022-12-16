<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
              type="button"
              @click="mobileMenuVisible = !mobileMenuVisible"
              class="inline-flex
              items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 text-white items-center">
            MUSICOUT
          </div>

          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <router-link
                  to="/main"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  :class="{ 'bg-gray-900 text-white' : $route.path === '/main'}"
              >
                {{ $t('Pages.Main') }}
              </router-link>

              <router-link
                  to="/manage"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  :class="{ 'bg-gray-900 text-white' : $route.path === '/manage'}"
              >
                {{ $t('Pages.Manage') }}
              </router-link>

              <router-link
                  to="/profile"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  :class="{ 'bg-gray-900 text-white' : $route.path === '/profile'}"
              >
                {{ $t('Pages.Profile') }}
              </router-link>
            </div>
          </div>
        </div>

        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div class="relative ml-3">
            <div>
              <button
                  type="button"
                  class="flex rounded-full bg-gray-800 text-sm focus:outline-none"
                  @click.prevent="userDropdownVisible = !userDropdownVisible"
              >
                <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
              </button>
            </div>

            <div
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                :class="{ 'hidden': !userDropdownVisible }"
            >
              <a
                  @click.prevent="$i18n.locale = $i18n.locale === 'en' ? 'ru' : 'en'"
                  class="block px-4 py-2 text-sm text-gray-700"
              >
                {{ $i18n.locale === 'en' ? 'English' : 'Русский' }}
              </a>

              <router-link
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700"
              >
                {{ $t('Global.YourProfile') }}
              </router-link>

              <a
                  href="#"
                  @click.prevent="logout"
                  class="block px-4 py-2 text-sm text-gray-700"
              >
                {{ $t('Global.SignOut') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
        class="sm:hidden"
        :class="{ 'hidden': !mobileMenuVisible }"
    >
      <div class="space-y-1 px-2 pt-2 pb-3">
        <router-link
            to="/main"
            class="hover:bg-gray-700 hover:text-white text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
            :class="{ 'bg-gray-900 text-white hover:bg-gray-900 hover:text-orange-600' : $route.path === '/main'}"
        >
          {{ $t('Pages.Main') }}
        </router-link>

        <router-link
            to="/manage"
            class="hover:bg-gray-700 hover:text-white text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
            :class="{ 'bg-gray-900 text-white hover:bg-gray-900 hover:text-orange-600' : $route.path === '/manage'}"
        >
          {{ $t('Pages.Manage') }}
        </router-link>

        <router-link
            to="/profile"
            class="hover:bg-gray-700 hover:text-white text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
            :class="{ 'bg-gray-900 text-white hover:bg-gray-900 hover:text-orange-600' : $route.path === '/profile'}"
        >
          {{ $t('Pages.Profile') }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';

export default {
  name: 'Header',
  setup () {
    /*
      variables
     */

    const userStore = useUserStore()

    const userDropdownVisible = ref(false)
    const mobileMenuVisible = ref(false)

    /*
      methods
     */

    const logout = () => {
      userDropdownVisible.value = false
      userStore.logout()
    }

    return {
      userDropdownVisible,
      mobileMenuVisible,
      logout
    }
  }
}
</script>

<style scoped>

</style>