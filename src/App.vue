<template>
  <div class="app">
    <Layout>
      <router-view />
    </Layout>
  </div>
</template>

<script setup>
import Layout from "./components/Layout.vue";
</script>

<style lang="scss" scoped>
.app {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
