<template>
  <router-view />
</template>

<script>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useSongStore } from '@/stores/songs';

export default {
  name: 'All',
  setup () {
    /*
      variables
     */

    const userStore = useUserStore()
    const songStore = useSongStore()

    /*
      lifecycle hooks
     */

    onMounted(() => {
      userStore.init()
      songStore.init()
    })
  }
}
</script>