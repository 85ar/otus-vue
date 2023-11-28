<template>
  <div></div>
</template>

<script setup>


const searchProductHandler = (search, arr) => {
  const filteredProducts = arr.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );
  return filteredProducts;
};
</script>

<style lang="scss" scoped></style>
