<template>
  <main>
    <section class="mb-8 py-20 text-white text-center relative">
      <div
          class="absolute inset-0 w-full h-full bg-contain introduction-bg"
          style="background-image: url('/header.png')"
      />

      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">{{ $t('MainView.Listen') }}</h1>
          <p class="w-full md:w-8/12 mx-auto px-3">{{ $t('MainView.Description') }}</p>
        </div>
      </div>

      <img
          class="relative block mx-auto px-10 my-20 w-auto max-w-full max-sm:hidden"
          src="/introduction-music.png"
      />
    </section>

    <SongsList />
  </main>
</template>

<script>
import SongsList from '@/components/SongsList.vue';

export default {
  name: 'Main',
  components: {
    SongsList
  }

}
</script>

<style scoped>

</style>