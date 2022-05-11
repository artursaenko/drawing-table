<template>
  <header class="header">
    <div class="container">
      <div>
        <p>Кімната {{ room }}</p>
        <h1 class="title">{{ title }}</h1>
      </div>

      <button type="button" class="btn-auth" @click="toggleRole">
        {{ textBtn }}
      </button>
    </div>
  </header>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import { logOff } from "@/service/auth";
import { getParams } from "@/utils";

export default {
  name: "Header",
  setup() {
    const store = useStore();
    let room = ref(null);
    room = getParams();

    const isUser = computed(() => store.getters.GET_USER);
    const title = computed(() => (isUser.value ? "Викладач" : "Студент"));
    const textBtn = computed(() => (isUser.value ? "Вийти" : "Увійти"));

    const toggleRole = () => {
      if (isUser.value) {
        logOff();
      } else {
        store.dispatch("TOGGLE_SHOW_FORM", false);
      }
    };
    store.dispatch("GET_USER");
    return { toggleRole, title, textBtn, room };
  },
};
</script>

<style lang="scss">
.header {
  padding: 20px 0;
  border-bottom: 1px solid #ececec;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.btn-auth {
  cursor: pointer;
  padding: 10px 32px;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  background: #2196f3;
  &:hover,
  &:focus {
    background: #188ce8;
  }
}
</style>
