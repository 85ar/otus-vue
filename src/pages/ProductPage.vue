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
            <div v-if="isInCart" class="quantityBlock">
              <button @click.stop="decrementQuantity(productItem)">
                <AkMinus class="minusIcon" />
              </button>
              <span class="quantity">{{
                getProductQuantityInCart(productItem)
              }}</span>
              <button @click.stop="incrementQuantity(productItem)">
                <AkPlus class="plusIcon" />
              </button>
            </div>
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
import { AkPlus } from "@kalimahapps/vue-icons";
import { AkMinus } from "@kalimahapps/vue-icons";
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

const addProductToBusket = (product) => {
  isInCart.value = true;
  // проверка, есть ли товар в корзине
  const orderExistIndex = shopStore.orders.findIndex(
    (item) => item.id === product.id,
  );
  //если его там еще нет, то добавляем его
  if (orderExistIndex === -1) {
    shopStore.orders.push({ ...product, quantity: 1 });
  } else {
    // если товар уже есть в корзине, то увеличиваем количество
    shopStore.orders[orderExistIndex].quantity++;
  }
};
const getProductQuantityInCart = (product) => {
  const order = shopStore.orders.find((item) => item.id === product.id);
  return order ? order.quantity : 0;
};

const incrementQuantity = (product) => {
  const orderExistIndex = shopStore.orders.findIndex(
    (item) => item.id === product.id,
  );
  if (orderExistIndex !== -1) {
    shopStore.orders[orderExistIndex].quantity++;
  }
};
const decrementQuantity = (product) => {
  const orderExistIndex = shopStore.orders.findIndex(
    (item) => item.id === product.id,
  );
  if (orderExistIndex !== -1) {
    const currentQuantity = shopStore.orders[orderExistIndex].quantity;
    if (currentQuantity > 1) {
      shopStore.orders[orderExistIndex].quantity--;
    } else {
      // Если количество товара в корзине становится 1, то удаляем его из корзины
      isInCart.value = false;
      shopStore.orders.splice(orderExistIndex, 1);
    }
  }
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
.quantityBlock {
  margin-left: 10px;
  display: flex;
  align-items: center;
}
.quantity {
  margin: 0 5px;
}
.minusIcon,
.plusIcon {
  width: 1em;
  height: 1em;
  color: $secondary;
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
