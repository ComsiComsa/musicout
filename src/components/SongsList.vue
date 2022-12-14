<template>
  <section class="container mx-auto">
    <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
    >
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Songs</span>
        <i class="fa fa-headphones-alt float-right text-green-400 text-xl" />
      </div>

      <ol id="playlist">
        <li
            v-for="song in songStore.songs" :key="song.id"
            class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
        >
          <div>
            <router-link :to="`/song/${song.id}`" class="font-bold block text-gray-600">{{ song.modifiedName }}</router-link>
            <span class="text-gray-500 text-sm">{{ song.originalName }}</span>
          </div>

          <div class="text-gray-600 text-lg">
              <span class="comments">
                <i class="fa fa-comments text-gray-600"></i>
                {{ song.commentsCount }}
              </span>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script>
import { useSongStore } from '@/stores/songs';

export default {
  name: 'SongsList',
  setup () {
    /*
      variables
     */

    const songStore = useSongStore()

    return {
      songStore
    }
  }
}
</script>