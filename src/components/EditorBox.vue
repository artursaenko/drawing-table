<template>
  <div
    v-show="showEditor"
    class="input-box"
    :style="{
      transform: 'translate(' + position.x + 'px,' + position.y + 'px)',
    }"
  >
    <ul class="d-flex edit-list">
      <li>
        <button
          type="button"
          class="circle-btn move-btn"
          @mousedown="startDragAndDrop"
        ></button>
      </li>
      <li class="save-item">
        <button type="button" class="circle-btn" @click="addShapeToCanvas">
          &#10004;
        </button>
      </li>
      <li class="close-item">
        <button type="button" class="circle-btn" @click="closeEditor">
          &#10006;
        </button>
      </li>
    </ul>
    <input
      type="text"
      class="input-elem"
      v-show="type === 'text'"
      v-model="value"
    />
    <div class="box-figure" v-show="typeFigure || userImg">
      <img :src="addImage" alt="figure" />
    </div>
    <input type="file" class="file" ref="file" @change="loadImg" />
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { renderImage } from "@/utils";

export default {
  name: "EditorBox",
  props: {
    posX: Number,
    posY: Number,
    updatePos: Function,
    onResetClass: Function,
    addTextToCanvas: Function,
    addImageToCanvas: Function,
  },
  setup(props) {
    const store = useStore();
    const value = ref("");
    let file = ref(null);
    let userImg = ref(null);

    const figure = ["square", "triangle", "circle"];
    const elements = [...figure, "text"];

    const position = computed(() => {
      return {
        x: props.posX,
        y: props.posY,
      };
    });

    const type = computed(() => store.getters.GET_EDITOR_SETTINGS.type);
    const typeFigure = computed(() => figure.includes(type.value));

    const showEditor = computed(
      () => elements.includes(type.value) || userImg.value
    );

    const startDragAndDrop = (e) => {
      const { offsetX, offsetY } = e;
      store.dispatch("SET_DRAG_AND_DROP", true);
      store.dispatch("SET_OFFSET_ELEMENT", { x: offsetX, y: offsetY });
    };

    const closeEditor = () => {
      store.dispatch("SET_EDITOR_SETTINGS", "");
      props.onResetClass();
      props.updatePos();
      userImg.value = null;
    };

    const addImage = computed(() => {
      if (typeFigure.value) {
        return require("@/assets/images/" + type.value + ".png");
      }
      return userImg.value;
    });

    const addShapeToCanvas = () => {
      const x = props.posX + 5;
      const y = props.posY + 30;
      if (typeFigure.value) {
        props.addImageToCanvas(addImage.value, x, y);
      }

      if (type.value === "text") {
        if (value.value) props.addTextToCanvas(value.value, x + 15, y + 25);
        value.value = "";
      }
      if (type.value === "img") {
        props.addImageToCanvas(userImg.value, x, y);
      }
      closeEditor();
    };

    const loadImg = () => {
      renderImage(file.value.files[0]).then((img) => {
        userImg.value = img;
      });
    };

    watch(type, (currentValue) => {
      if (currentValue === "img") {
        file.value.click();
      }
    });

    return {
      addShapeToCanvas,
      startDragAndDrop,
      closeEditor,
      typeFigure,
      showEditor,
      userImg,
      loadImg,
      addImage,
      position,
      value,
      file,
      type,
    };
  },
};
</script>

<style lang="scss">
.input-box {
  background: transparent;
  position: absolute;
  width: 300px;
  padding: 5px;
  left: 0;
  top: 0;
  transition: transform 0.05s ease;
}
.input-elem {
  width: 100%;
  height: 40px;
  margin: 0;
  background: transparent;
  border: 1px solid #ccc;
  padding: 0 15px;
  &:focus {
    border-color: #2196f3;
  }
}

.edit-list {
  padding-bottom: 5px;
}

.circle-btn {
  width: 20px;
  height: 20px;
  border: none;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  display: block;
}
.save-item {
  margin-left: auto;
  margin-right: 5px;
  & button:hover,
  & button:focus {
    color: rgb(0, 255, 17);
  }
}
.close-item button:hover,
.close-item button:focus {
  color: rgb(206, 37, 37);
}
.move-btn {
  cursor: move;
}
.box-figure {
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
}
.file {
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  margin-top: -1px;
}
</style>
