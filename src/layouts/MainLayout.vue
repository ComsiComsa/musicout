<template>
  <main>
    <Header />

    <div
      :class="{ 'mb-12 pb-12': playerStore.showPlayer }"
    >
      <router-view />
    </div>

    <PlayerModal v-if="playerStore.showPlayer" />
  </main>
</template>

<script>
import { usePlayerStore } from '@/stores/player';

import Header from '@/components/layout/Header.vue';
import PlayerModal from '@/components/PlayerModal.vue';

export default {
  name: 'MainLayout',
  components: {
    Header,
    PlayerModal
  },
  setup () {
    /*
      variables
     */

    const playerStore = usePlayerStore()

    return {
      playerStore
    }
  }
}
</script>

<style scoped>

</style>