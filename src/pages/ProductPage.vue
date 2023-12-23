<template>
  <div>
    <div v-if="loading">
      <Spinner />
    </div>
    <div class="card" v-else-if="productItem">
      <div class="imageBlock">
        <img :src="productItem.image" alt="img" class="img" />
      </div>
      <div class="infoBlock">
        <div class="title">{{ productItem.title }}</div>
        <div class="description">{{ productItem.description }}</div>
        <div class="category">Category: {{ productItem.category }}</div>
        <div class="count">Count: {{ productItem.rating?.count }}</div>
        <div class="priceBlock">
          <div class="price">
            Price:
            <span class="priceValue">{{ productItem.price }} $</span>
          </div>
          <button
            :class="{ buyBtn: !isInCart, inCartBtn: isInCart }"
            @click="addProductToBusket(productItem)"
            :disabled="isInCart"
          >
            {{ isInCart ? "In cart" : "Add to cart" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useShopStore } from "../store/shopStore";
import { storeToRefs } from "pinia";
import Spinner from "../components/Spinner.vue";

const shopStore = useShopStore();
const { productItem } = storeToRefs(shopStore);
const isInCart = ref(false);
const route = useRoute();
const loading = ref(true);

onMounted(async () => {
  await shopStore.fetchProductById(route.params.productId);
  loading.value = false;
});

onUnmounted(() => {
  shopStore.resetProductItem();
});

const addProductToBusket = () => {
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
