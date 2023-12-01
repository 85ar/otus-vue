<template>
  <div class="card">
    <div class="imageBlock">
      <img :src="props.product.image" alt="img" class="img" />
    </div>
    <div class="infoBlock">
      <div class="title">{{ props.product.title }}</div>
      <div class="priceBlock">
        <div class="price">
          Price:
          <span class="priceValue">{{ props.product.price }} $</span>
        </div>

        <button class="buyBtn" @click="addProductToBusket(props.product)">Add to cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits();

const props = defineProps({
  product: {
    type: Object,
  },
});

const addProductToBusket = (product) => {
  emit("productOrderEmit", product);
};
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card:hover {
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.35));
  cursor: pointer;
}
.imageBlock {
  width: 170px;
  height: 170px;
  display: flex;
  margin: 0 auto;
  margin-bottom: 10px;
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
.priceBlock {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.price {
  font-size: 14px;
}
.priceValue {
  color: $third;
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
.buyBtn {
  background-color: $accent;
  padding: 6px 8px;
  color: $primary;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
}
.buyBtn:hover {
  background-color: $third;
}

</style>
