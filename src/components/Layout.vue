<template>
  <div class="layout">
    <Header></Header>
    <main class="content">
      <MainPage></MainPage>
    </main>
    <Footer></Footer>
  </div>
</template>

<script setup>
import MainPage from "../pages/MainPage.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content {
  flex: 1;
}
</style>
