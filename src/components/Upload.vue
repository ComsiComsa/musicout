<template>
  <div class="col-span-1">
    <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
    >
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">{{ $t('Global.Upload') }}</span>
        <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
      </div>

      <div class="p-6">
        <div
          class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
          :class="{ 'bg-green-400 border-green-400 border-solid text-white': isDragover }"
          @drag.prevent.stop=""
          @dragstart.prevent.stop=""
          @dragend.prevent.stop="isDragover = false"
          @dragover.prevent.stop="isDragover = true"
          @dragenter.prevent.stop="isDragover = true"
          @dragleave.prevent.stop="isDragover = false"
          @drop.prevent.stop="upload($event)"
        >
          <label class="cursor-pointer" for="fileInput">{{ $t('UploadComponent.DropYourFilesHere') }}</label>
          <input id="fileInput" type="file" multiple @change="upload($event)" class="hidden" />
        </div>

        <hr class="my-6" />

        <div
            v-for="(upload, index) in songStore.uploads" :key="index"
            class="mb-4"
        >
          <div
              class="font-bold text-sm"
              :class="upload.textClass"
          >
            <i :class="upload.icon"></i> {{ upload.name }}
          </div>

          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <div
                class="transition-all progress-bar"
                :class="upload.bgClass"
                :style="{ width: upload.currentProgress + '%' }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeUnmount } from 'vue';
import { useSongStore } from '@/stores/songs';

export default {
  name: 'Upload',
  setup () {
    /*
      variables
     */

    const isDragover = ref(false)

    const songStore = useSongStore()

    /*
      methods
     */

    const upload = (evt) => {
      isDragover.value = false

      const files = evt.dataTransfer ?
          [ ...evt.dataTransfer.files ] : [ ...evt.target.files ]

      files.forEach((file) => {
        if (file.type.includes('audio')) {
          songStore.upload(file)
        } else {
          return
        }
      })
    }

    const cancelUploads = () => {
      songStore.cancelAllUploads()
    }

    return {
      isDragover,
      songStore,
      upload,
      cancelUploads
    }
  }
}
</script>