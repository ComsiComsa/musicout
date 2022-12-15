<template>
  <div class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full">
    <div class="text-center">
      <span class="song-title font-bold">{{ playerStore.currentSong.modifiedName }}</span> by
      <span class="song-artist">Artist</span>
    </div>

    <div class="flex flex-nowrap gap-4 items-center">
      <button type="button" @click.prevent="playerStore.toggleAudio">
        <i
            class="fa text-gray-500 text-xl"
            :class="playerStore.isPlaying ? 'fa-pause' : 'fa-play'"
        />
      </button>

      <div class="player-currenttime">{{ playerStore.seek }}</div>

      <div
          @click.prevent="playerStore.updateSeek($event)"
          class="w-full h-2 rounded bg-gray-200 relative cursor-pointer"
      >
        <span
            class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
            :style="{ left: playerStore.position }"
        >
            <i class="fas fa-circle"></i>
        </span>

        <span
            class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
            :style="{ width: playerStore.position }"
        />
      </div>

      <div class="player-duration">{{ playerStore.duration }}</div>
    </div>
  </div>
</template>

<script>
import { usePlayerStore } from '@/stores/player';

export default {
  name: 'PlayerModal',
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