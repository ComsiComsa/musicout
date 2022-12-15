<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
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

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all .3s linear;
}

.fade-leave-to {
  transition: all .3s linear;
  opacity: 0;
}
</style>