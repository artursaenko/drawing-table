<template>
  <ul class="list-icon">
    <li class="list-item" v-for="option in options" :key="option.icon">
      <button
        type="button"
        class="list-btn"
        @click="updateDrawing(option)"
        :disabled="option.disabled && !isUser"
        :class="{ current: option.current && editorSettings.type }"
        :aria-label="t('tool_' + option.type)"
        :title="t('tool_' + option.type)"
      >
        <img :src="addImage(option.icon)" alt="" width="40" />
      </button>
    </li>
  </ul>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { t } from "@/i18n";

export default {
  name: "DrawingTools",
  props: {
    options: Array,
    resetClass: Function,
  },
  setup(props) {
    const store = useStore();

    const isUser = computed(() => store.getters.GET_USER);
    const option = computed(() => props.options);

    const editorSettings = computed(() => store.getters.GET_EDITOR_SETTINGS);

    const addImage = (img) => require("@/assets/images/" + img);

    const updateDrawing = (data) => {
      props.resetClass(data.icon);
      data.current = !data.current;
      const type = data.current ? data.type : "";
      store.dispatch("SET_EDITOR_SETTINGS", type);
    };

    return {
      updateDrawing,
      addImage,
      editorSettings,
      option,
      isUser,
      t,
    };
  },
};
</script>

<style lang="scss">
.list-item:not(:last-child) {
  margin-bottom: 10px;
}
.list-icon {
  padding: 0 15px;
}
.list-btn {
  border: 1px solid #ccc;
  padding: 10px;
  display: block;
  &.current {
    background: #2195f33a;
    border: 1px solid #2196f3;
  }
  &:disabled {
    opacity: 0.5;
    background: #ebebeb;
  }
}
</style>
