<template>
  <div>
    <div class="flex w-40 mx-0">
      <img class="object-contain" :src="product.image" alt="img" />
    </div>
    <h3>{{ product.title }}</h3>

    <div>{{ product.price }}</div>
  </div>
</template>

<script setup>
defineProps(["product"]);
</script>

<style lang="scss" scoped></style>
