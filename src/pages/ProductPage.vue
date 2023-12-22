<template>
  <div class="card" v-if="product">
    <div class="imageBlock">
      <img :src="product.image" alt="img" class="img" />
    </div>

    <div class="infoBlock">
      <div class="title">{{ product.title }}</div>
      <div class="description">{{ product.description }}</div>
      <div class="category">Category: {{ product.category }}</div>
      <div class="count">Count: {{ product.rating.count }}</div>
      <div class="priceBlock">
        <div class="price">
          Price:
          <span class="priceValue">{{ product.price }} $</span>
        </div>
        <button
          :class="{ buyBtn: !isInCart, inCartBtn: isInCart }"
          @click="addProductToBusket(product)"
          :disabled="isInCart"
        >
          {{ isInCart ? "In cart" : "Add to cart" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getProduct } from "./../services/getProduct";

const emit = defineEmits();
const isInCart = ref(false);
const route = useRoute();
const product = ref();

onMounted(async () => {
  try {
    const data = await getProduct(route.params.productId);
    if (data) {
      product.value = data;
    }
  } catch (error) {
    console.log("error", error);
  }
});

const addProductToBusket = (product) => {
  emit("productOrderEmit", product);
  isInCart.value = true;
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  margin: 0 auto;
  padding: 20px;
  background-color: $primary;
}

.imageBlock {
  max-width: 300px;
  max-height: 300px;
  overflow: hidden;
  border-radius: 8px;
  margin-right: 20px;
}

.img {
  object-fit: contain;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.infoBlock {
  display: flex;
  flex-direction: column;
}

.title {
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 10px;
}

.description {
  font-size: 18px;
  margin-bottom: 10px;
  color: $secondary;
  line-height: 1.4;
}

.category {
  font-size: 16px;
  color: $secondary;
  margin-bottom: 5px;
}

.count {
  font-size: 16px;
  color: $secondary;
}

.priceBlock {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.price {
  font-size: 20px;
  font-weight: bold;
  margin-right: 20px;
}

.priceValue {
  color: $third;
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
