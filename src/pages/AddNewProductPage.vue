<template>
  <div>
    <p class="title">Add new product</p>

    <form @submit.prevent="addProduct" class="form">
      <div class="inputGroup">
        <div class="labelGroup">
          <label>Title</label>
          <input type="text" v-model="title" class="input" />
        </div>
        <div class="error">{{ errors.title }}</div>
      </div>

      <div class="inputGroup">
        <div class="labelGroup">
          <label>Price</label>
          <input type="number" v-model="price" class="input" />
        </div>
        <div class="error">{{ errors.price }}</div>
      </div>

      <div class="inputGroup">
        <div class="labelGroup">
          <label>Description</label>
          <textarea v-model="description" class="textarea"></textarea>
        </div>
        <div class="error">{{ errors.description }}</div>
      </div>

      <div class="inputGroup">
        <div class="labelGroup">
          <label>Category</label>
          <select v-model="category" class="select">
            <option class="option" disabled selected>
              Choose category ...
            </option>
            <option class="option" value="electronics">electronics</option>
            <option class="option" value="jewelery">jewelery</option>
            <option class="option" value="men's clothing">
              men's clothing
            </option>
            <option class="option" value="women's clothing">
              women's clothing
            </option>
          </select>
        </div>
        <div class="error">{{ errors.category }}</div>
      </div>

      <div class="inputGroup">
        <div class="labelGroup">
          <label>Image URL</label>
          <input v-model="image" class="input" />
        </div>
        <div class="error">{{ errors.image }}</div>
      </div>

      <div class="inputGroup">
        <div class="labelGroup">
          <label>Rating Rate</label>
          <input v-model="rating.rate" type="number" step="0.1" class="input" />
        </div>
        <div class="error">{{ errors.rating.rate }}</div>
      </div>

      <div class="inputGroup">
        <div class="labelGroup">
          <label>Rating Count</label>
          <input v-model="rating.count" type="number" class="input" />
        </div>
        <div class="error">{{ errors.rating.count }}</div>
      </div>

      <div class="btnsGroup">
        <button class="btn btnBuy" type="submit">Add new product</button>
        <button class="btn" type="reset">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as Yup from "yup";
import { useShopStore } from "../store/shopStore";
const shopStore = useShopStore();

const title = ref("");
const price = ref("");
const description = ref("");
const category = ref("");
const image = ref("");
const rating = ref({ rate: 0, count: 0 });

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  image: Yup.string().required("Image URL is required").url("Invalid URL"),
  rating: Yup.object().shape({
    rate: Yup.number().required("Rating Rate is required").min(0).max(5),
    count: Yup.number().required("Rating Count is required").integer().min(0),
  }),
});

const errors = ref({
  title: "",
  price: "",
  description: "",
  category: "",
  image: "",
  rating: { rate: "", count: "" },
});

const addProduct = async () => {
  try {
    await schema.validate(
      {
        title: title.value,
        price: price.value,
        description: description.value,
        category: category.value,
        image: image.value,
        rating: { rate: rating.value.rate, count: rating.value.count },
      },
      { abortEarly: false },
    );

    const newProduct = {
      id: Date.now(),
      title: title.value,
      price: parseFloat(price.value),
      description: description.value,
      category: category.value,
      image: image.value,
      rating: {
        rate: parseFloat(rating.value.rate),
        count: parseInt(rating.value.count),
      },
    };

    if (Object.values(newProduct).length > 0) {
      shopStore.products.push(newProduct);
    }

    title.value = "";
    price.value = "";
    description.value = "";
    category.value = "";
    image.value = "";
    rating.value = { rate: 0, count: 0 };
    resetErrors();
  } catch (validationError) {
    validationError.inner.forEach((error) => {
      if (error.path === "rating.rate" || error.path === "rating.count") {
        errors.value.rating[error.path] = error.message;
      } else {
        errors.value[error.path] = error.message;
      }
    });
    console.error("Validation error:", validationError);
  }
};
const resetErrors = () => {
  errors.value = {
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: { rate: "", count: "" },
  };
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  margin-bottom: 20px;
  text-decoration: underline;
  text-decoration-color: $third;
  text-underline-offset: 6px;
}
.form {
  margin: 2px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.input {
  min-width: 800px;
  font-size: 14px;
  padding: 6px 0 4px 10px;
  border: 1px solid $additional;
  background-color: $primary;
  border-radius: 4px;
}
.select {
  min-width: 800px;
  font-size: 14px;
  padding: 6px 0 4px 10px;
  border: 1px solid $additional;
  background-color: $primary;
  border-radius: 4px;
}
.option {
  padding: 10px;
}
.textarea {
  min-width: 800px;
  height: 100px;
  font-size: 14px;
  padding: 6px 0 4px 10px;
  border: 1px solid $additional;
  background-color: $primary;
  border-radius: 4px;
}
.labelGroup {
  width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btnsGroup {
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: center;
}
.btn {
  cursor: pointer;
  background-color: $third;
  color: $primary;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
}
.btnBuy {
  background-color: $accent;
  margin-right: 10px;
}
.inputGroup {
  margin-bottom: 10px;
}
</style>
