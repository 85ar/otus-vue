<template>
  <div>
    <div>
      <img :src="props.product.image" alt="img" />
    </div>
    <div>
      <p>{{ props.product.title }}</p>
      <span>Price: {{ props.product.price }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
  },
});
</script>

<style lang="scss" scoped></style>
