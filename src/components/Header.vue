<template>
  <header class="header">
    <div class="container">
      <div>
        <p>{{ t("room") }} {{ room }}</p>
        <h1 class="title">{{ title }}</h1>
      </div>

      <div class="header-actions">
        <div class="lang-switch" role="group" :aria-label="t('language')">
          <button
            v-for="code in languages"
            :key="code"
            type="button"
            class="lang-btn"
            :class="{ active: code === lang }"
            :aria-pressed="code === lang"
            @click="setLang(code)"
          >
            {{ code.toUpperCase() }}
          </button>
        </div>
        <button type="button" class="btn-auth" @click="toggleRole">
          {{ textBtn }}
        </button>
      </div>
    </div>
    <div v-if="isDemo" class="container demo-hint">
      <p>{{ t("demoHint") }}</p>
      <a :href="secondWindowUrl" target="_blank" rel="noopener">{{
        t("openSecond")
      }}</a>
    </div>
  </header>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import { logOff } from "@/service/auth";
import { getParams, isDemoRoom } from "@/utils";
import { t, lang, setLang, languages } from "@/i18n";

export default {
  name: "Header",
  setup() {
    const store = useStore();
    const room = getParams();
    const isDemo = isDemoRoom();

    const isUser = computed(() => store.getters.GET_USER);
    const title = computed(() =>
      lang.value && isUser.value ? t("teacher") : t("student")
    );
    const textBtn = computed(() => {
      if (lang.value && isDemo && !store.state.user) {
        return isUser.value ? t("viewStudent") : t("tryTeacher");
      }
      return isUser.value ? t("logout") : t("login");
    });
    const secondWindowUrl = location.pathname + "?room=demo";

    const toggleRole = () => {
      if (isDemo && !store.state.user) {
        store.commit("SET_DEMO_TEACHER", !store.state.demoTeacher);
      } else if (isUser.value) {
        logOff();
      } else {
        store.dispatch("TOGGLE_SHOW_FORM", false);
      }
    };
    store.dispatch("GET_USER");
    return {
      toggleRole,
      title,
      textBtn,
      room,
      isDemo,
      secondWindowUrl,
      t,
      lang,
      setLang,
      languages,
    };
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

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.lang-switch {
  display: flex;
  border: 1px solid #d0d7de;
  border-radius: 4px;
  overflow: hidden;
}

.lang-btn {
  cursor: pointer;
  padding: 8px 12px;
  border: none;
  background: #fff;
  font-size: 14px;
  &.active {
    background: #212121;
    color: #fff;
  }
}

.demo-hint {
  margin-top: 16px;
  padding: 12px 15px;
  background: #e8f2fd;
  border-radius: 4px;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  a {
    color: #0d5bab;
    font-weight: 600;
    white-space: nowrap;
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
