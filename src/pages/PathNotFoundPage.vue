<template>
  <div class="notFound">
    <p class="title">404 - Not Found</p>
    <p class="text">Oops! The page you are looking for could not be found.</p>
    <router-link class="link" to="/">Go Home</router-link>
  </div>
</template>

<style lang="scss" scoped>
.notFound {
  margin-top: 80px;
  text-align: center;
}

.title {
  font-size: 56px;
  color: $third;
  margin-bottom: 20px;
}

.text {
  font-size: 20px;
  color: $secondary;
}

.link {
  display: block;
  margin-top: 20px;
  font-size: 20px;
  color: $accent;
  text-decoration: underline;
}
</style>
