<template>
  <!-- <div id="nav"><router-link to="/">Home</router-link> |</div> -->
  <Header />
  <router-view />
  <ModalForm />
</template>

<script>
import Header from "./components/Header.vue";
import ModalForm from "./components/ModalForm.vue";

export default {
  components: { Header, ModalForm },
  setup() {},
};
</script>

<style lang="scss">
@import "@/assets/scss/reset.scss";
@import "@/assets/scss/common.scss";
</style>
