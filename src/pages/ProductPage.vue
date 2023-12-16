<template>
  <div class="card" v-if="product">
    <div class="imageBlock">
      <img :src="product.image" alt="img" class="img" />
    </div>
    <div class="infoBlock">
      <div class="title">{{ product.title }}</div>
      <div class="description">{{ product.description }}</div>
      <div class="priceBlock">
        <div class="price">
          Price:
          <span class="priceValue">{{ product.price }} $</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getData } from "./../services/getData";

const route = useRoute();
const productId = ref("");
const product = ref();

onMounted(async () => {
  productId.value = route.params.productId;

  try {
    const data = await getData();
    if (data) {
      product.value = data.filter(
        (item) => item.id === Number(productId.value),
      )[0];
    }
  } catch (error) {
    console.log("error", error);
  }
});
</script>

<style lang="scss" scoped></style>
