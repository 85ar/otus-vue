<template>
  <div class="card" @click="openProductDetail(props.product)">
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

        <button
          :class="{ buyBtn: !isInCart, inCartBtn: isInCart }"
          @click.stop="addProductToBusket(props.product)"
          :disabled="isInCart"
        >
          {{ isInCart ? "In cart" : "Add to cart" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const emit = defineEmits();
const isInCart = ref(false);

const props = defineProps({
  product: {
    type: Object,
  },
});

const addProductToBusket = (product) => {
  emit("productOrderEmit", product);
  isInCart.value = true;
};

const openProductDetail = (product) => {
  router.push({
    name: 'product', params: { productId: product.id }
  });
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
  padding: 6px 8px;
  color: $primary;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  background-color: $accent;
}
.buyBtn:hover {
  background-color: $third;
}
.inCartBtn {
  padding: 6px 8px;
  color: $primary;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  background-color: $third;
}
</style>
