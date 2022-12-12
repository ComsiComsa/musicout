<template>
  <Header />

  <router-view />
</template>

<script>
import Header from '@/components/layout/Header.vue';

export default {
  name: 'MainLayout',
  components: {
    Header
  }
}
</script>

<style scoped>

</style>