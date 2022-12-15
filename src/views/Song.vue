<template>
  <main>
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
          class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
          style="background-image: url('/song-header.png')"
      />

      <div class="container mx-auto flex items-center" v-if="song">
        <button
            type="button"
            class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
            @click.prevent.="playNewSong"
        >
          <i
            class="fas"
            :class="song.url === playerStore.currentSong.url && playerStore.isPlaying ? 'fa-pause' : 'fa-play'"
          />
        </button>

        <div class="z-50 text-left ml-8">
          <div class="text-3xl font-bold">{{ song.modifiedName }}</div>
          <div>{{ song.genre }}</div>
        </div>
      </div>
    </section>

    <section v-if="song" class="container mx-auto mt-6">
      <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="card-title">Comments ({{ commentStore.comments.length }})</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>

        <div class="p-6">
          <vee-form
            :validation-schema="validationScheme"
            @submit="onSubmit"
          >
            <vee-field
                as="textarea"
                name="comment"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Your comment here..."
            />
            <ErrorMessage name="comment" class="text-red-600" />

            <button
                type="submit"
                class="py-1.5 px-3 mt-4 rounded text-white bg-green-600 block"
                :disabled="submitting"
            >
              <i class="fas fa-spinner fa-spin" v-if="submitting" /> Submit
            </button>
          </vee-form>
        </div>
      </div>
    </section>

    <ul class="container mx-auto" v-if="song">
      <li
        v-for="comment in commentStore.comments" :key="comment.id"
        class="p-6 bg-gray-50 border border-gray-200"
      >
        <div class="mb-5">
          <div class="font-bold">{{ comment.author }}</div>
          <time>{{ new Date(comment.created).toLocaleString() }}</time>
        </div>

        <p>{{ comment.content }}</p>
      </li>
    </ul>
  </main>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';

import { useSongStore } from '@/stores/songs';
import { useCommentStore } from '@/stores/comments';
import { usePlayerStore } from '@/stores/player';

export default {
  name: 'Song',
  setup () {
    /*
      variables
     */

    const playerStore = usePlayerStore()
    const commentStore = useCommentStore()
    const songStore = useSongStore()
    const route = useRoute()

    const song = ref(null)
    const submitting = ref(false)

    const validationScheme = ref({
      comment: 'required'
    })

    /*
      methods
     */

    const onSubmit = (form, { resetForm }) => {
      submitting.value = true

      commentStore.addComment(route.params.id, form.comment, song)
          .then(() => {
            resetForm()
          })
          .finally(() => {
            submitting.value = false
          })
    }

    const playNewSong = () => {
      if (song.value.url === playerStore.currentSong.url) {
        playerStore.toggleAudio()
      } else {
        playerStore.addNewSong(song.value)
      }
    }

    /*
      lifecycle hooks
     */

    onBeforeMount(async () => {
      song.value = await songStore.getSongById(route.params.id)
    })

    /*
      route guard
     */

    onBeforeRouteLeave((to, from) => {
      commentStore.unsubscribeQuery()
    })

    return {
      song,
      submitting,
      validationScheme,
      commentStore,
      playerStore,
      onSubmit,
      playNewSong
    }
  }
}
</script>