<template>
  <div class="card">
    <div class="imageBlock">
      <img :src="props.product.image" alt="img" class="img" />
    </div>
    <div class="infoBlock">
      <p class="title">{{ props.product.title }}</p>
      <span class="price">Price: {{ props.product.price }}</span>
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

<style lang="scss" scoped>
.card {
  width: 250px;
  padding: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.15));
  background: $primary;
  border-radius: 20px;
}
.imageBlock {
  width: 170px;
  height: 170px;
  display: flex;
  margin: 0 auto;
  margin-bottom: 15px;
}
.img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.infoBlock {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // min-height: 115px;
}
.price {
  font-size: 12px;
  margin-bottom: 6px;
}
.title {
  text-align: center;
  font-size: 16px;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
