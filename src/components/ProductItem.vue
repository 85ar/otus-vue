<template>
  <div class="w-72 p-5">
    <div class="flex w-40 h-40 m-auto mb-2">
      <img
        class="object-contain flex w-full h-full"
        :src="product.image"
        alt="img"
      />
    </div>
    <div class="">
      <p class="m-auto text-center font-bold">{{ product.title }}</p>
      <span class="font-thin">Price: {{ product.price }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps(["product"]);
</script>

<style lang="scss" scoped></style>
