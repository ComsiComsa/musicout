<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <Upload ref="upload" />

      <div class="col-span-2">
        <div
            class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
                class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>

          <div class="p-6">
            <div
                v-for="song in songStore.getUserSongs" :key="song.id"
                class="border border-gray-200 p-3 mb-4 rounded"
            >
              <template v-if="song.editable">
                <vee-form
                  :validation-scheme="validationSchema"
                  :initial-values="song"
                  @submit="onSubmit"
                >
                  <div class="mb-3">
                    <label class="inline-block mb-2" for="modifiedName">Song Title</label>
                    <vee-field
                        name="modifiedName"
                        type="text"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter Song Title"
                    />
                    <ErrorMessage name="name" class="text-red-600" />
                  </div>

                  <div class="mb-3">
                    <label class="inline-block mb-2" for="genre">Genre</label>
                    <vee-field
                        name="genre"
                        type="text"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter Genre"
                    />
                    <ErrorMessage name="genre" class="text-red-600" />
                  </div>

                  <button
                      type="submit"
                      class="py-1.5 px-3 rounded text-white bg-green-600"
                  >
                    Save
                  </button>

                  <button
                      type="button"
                      class="py-1.5 px-3 rounded text-white bg-gray-600"
                      @click.prevent.stop="songStore.openEditPopup(song)"
                  >
                    Go Back
                  </button>
                </vee-form>
              </template>

              <template v-else>
                <div>
                  <h4 class="inline-block text-2xl font-bold">{{ song.originalName }}</h4>
                  <button
                      class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
                      @click="songStore.deleteSong(song)"
                  >
                    <i class="fa fa-times"></i>
                  </button>

                  <button
                      class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
                      @click="songStore.openEditPopup(song)"
                  >
                    <i class="fa fa-pencil-alt"></i>
                  </button>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onBeforeRouteLeave } from 'vue-router';
import { ref } from 'vue';

import { useSongStore } from '@/stores/songs';
import Upload from '@/components/Upload.vue';

export default {
  name: 'Manage',
  components: {
    Upload
  },
  setup () {
    /*
      variables
     */

    const songStore = useSongStore()
    const upload = ref(null)

    const validationSchema = ref({
      modifiedName: 'required',
      genre: 'required|alphaSpaces',
    })

    /*
      route guard
     */

    onBeforeRouteLeave((to, from) => {
      upload.value.cancelUploads()
    })

    /*
      methods
     */

    const onSubmit = (form) => {
      songStore.editSong(form)
    }

    return {
      songStore,
      upload,
      validationSchema,
      onSubmit
    }
  }
}
</script>

<style scoped>

</style>