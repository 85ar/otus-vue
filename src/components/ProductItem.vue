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
          <div v-if="isInCart" class="quantityBlock">
            <button @click.stop="decrementQuantity">
              <AkMinus class="minusIcon" />
            </button>
            <span class="quantity">{{
              getProductQuantityInCart(props.product)
            }}</span>
            <button @click.stop="incrementQuantity">
              <AkPlus class="plusIcon" />
            </button>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useShopStore } from "../store/shopStore";
import { AkPlus } from "@kalimahapps/vue-icons";
import { AkMinus } from "@kalimahapps/vue-icons";

const shopStore = useShopStore();

const router = useRouter();
const isInCart = ref(false);

const props = defineProps({
  product: {
    type: Object,
  },
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

const incrementQuantity = () => {
  const orderExistIndex = shopStore.orders.findIndex(
    (item) => item.id === props.product.id,
  );
  if (orderExistIndex !== -1) {
    shopStore.orders[orderExistIndex].quantity++;
  }
};
const decrementQuantity = () => {
  const orderExistIndex = shopStore.orders.findIndex(
    (item) => item.id === props.product.id,
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

const openProductDetail = (product) => {
  router.push({
    name: "product",
    params: { productId: product.id },
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
