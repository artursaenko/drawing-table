<template>
  <div class="wrapper" :class="{ 'is-hidden': isShowForm }">
    <form class="form" @submit.prevent="getData">
      <button type="button" class="close-btn" @click="hiddenForm">
        &#10006;
      </button>
      <div>
        <input
          type="email"
          required
          name="email"
          placeholder="Email"
          class="input-elem"
          v-model.trim="email"
        />
      </div>
      <div>
        <input
          type="password"
          required
          name="password"
          placeholder="password"
          class="input-elem"
          v-model.trim="password"
        />
      </div>

      <button type="submit" class="send-btn">send</button>
    </form>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import Notiflix from "notiflix";

export default {
  name: "ModalForm",
  setup() {
    const store = useStore();

    let email = ref("");
    let password = ref("");

    const hiddenForm = () => {
      store.dispatch("TOGGLE_SHOW_FORM", true);
      password.value = "";
      email.value = "";
    };

    const getData = () => {
      store
        .dispatch("VALIDATE_USER", {
          password: password.value,
          email: email.value,
        })
        .then(() => {
          Notiflix.Notify.success("Привіт, викладач!");
        })
        .catch(() => {
          Notiflix.Notify.warning("Упс! Щось пішло не так...");
        })
        .finally(() => {
          hiddenForm();
        });
    };

    const isShowForm = computed(() => store.state.showForm);

    return { hiddenForm, getData, email, password, isShowForm };
  },
};
</script>

<style lang="scss">
.wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background: #21212129;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s ease;
  &.is-hidden {
    opacity: 0;
    pointer-events: none;
  }
}
.form {
  background: #fff;
  border-radius: 7px;
  padding: 40px;
  position: relative;
  max-width: 500px;
  width: calc(100% - 30px);
  .input-elem {
    padding: 0 15px;
    width: 100%;
    border: 1px solid #ccc;
    height: 40px;
    border-radius: 4px;
    margin-bottom: 20px;
    outline: none;
    &:hover,
    &:focus {
      border: 1px solid #188ce8;
    }
  }
}
.close-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ccc;
  position: absolute;
  right: 8px;
  top: 8px;
  font-size: 16px;
  color: #ccc;
  line-height: 30px;
  text-align: center;
  background: transparent;
  &:hover,
  &:focus {
    color: #188ce8;
  }
}

.send-btn {
  padding: 10px 32px;
  border-radius: 4px;
  border: none;
  margin: 0 auto;
  color: #fff;
  display: block;
  background: #2196f3;
  &:hover,
  &:focus {
    background: #188ce8;
  }
}
</style>
