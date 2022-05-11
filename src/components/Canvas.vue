<template>
  <div
    class="wrapper-canvas"
    @mousemove="moveElement"
    @mouseup="stopDragAndDrop"
  >
    <EditorBox
      :posX="posX"
      :posY="posY"
      :clearCanvas="clearCanvas"
      :updatePos="updatePos"
      :addTextToCanvas="addTextToCanvas"
      :addImageToCanvas="addImageToCanvas"
      :onResetClass="onResetClass"
    />
    <canvas class="canvas" width="1095" height="600" ref="canvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";

import EditorBox from "@/components/EditorBox.vue";

import { getData, sendData } from "@/service/database";
import { getParams } from "@/utils";

export default {
  name: "Canvas",
  components: { EditorBox },
  props: {
    resetClass: Function,
  },
  setup(props) {
    const store = useStore();
    let posX = ref(0);
    let posY = ref(0);
    let canvas = ref(null);
    let ctx = ref(null);

    const updatePos = (x = 0, y = 0) => {
      posX.value = x;
      posY.value = y;
    };

    const typeSelect = computed(() => store.getters.GET_EDITOR_SETTINGS.type);

    const moveElement = (e) => {
      if (!store.getters.GET_DRAG_AND_DROP) return;
      const { layerX, layerY } = e;
      const { x, y } = store.getters.GET_OFFSET_ELEMENT;
      updatePos(layerX - x, layerY - y);
    };

    const stopDragAndDrop = () => {
      store.dispatch("SET_DRAG_AND_DROP", false);
    };

    const addTextToCanvas = (text, x = 0, y = 0) => {
      ctx.value.font = "18px Roboto";
      ctx.value.fillText(text, x, y);
      sendImage();
    };

    getData(getParams()).then((data) => {
      if (data) {
        const { image, width, height } = data;
        addImageToCanvas(image, 0, 0, width, height, false);
      }
    });

    const sendImage = () => {
      sendData(getParams(), {
        image: dataURL(),
        id: Date.now(),
        width: canvas.value.width,
        height: canvas.value.height,
      });
    };

    const addImageToCanvas = (
      url,
      x = 0,
      y = 0,
      w = 300,
      h = 300,
      flag = true
    ) => {
      let img = new Image();
      img.src = url;
      img.onload = function () {
        ctx.value.drawImage(img, x, y, w, h);
        if (flag) sendImage();
      };
    };

    const clearCanvas = () => {
      ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
      sendData(getParams(), null);
    };

    const onResetClass = () => {
      props.resetClass();
    };

    const dataURL = () => canvas.value.toDataURL("image/png");

    const downloadImage = () => {
      const link = document.createElement("a");
      link.href = dataURL();
      link.download = "my-image.png";
      link.click();
    };

    watch(typeSelect, (currentValue) => {
      if (currentValue === "delete") {
        onResetClass();
        return clearCanvas();
      }
      if (currentValue === "download") {
        onResetClass();
        return downloadImage();
      }
    });

    onMounted(() => {
      ctx.value = canvas.value.getContext("2d");
    });

    return {
      addTextToCanvas,
      clearCanvas,
      onResetClass,
      addImageToCanvas,
      moveElement,
      stopDragAndDrop,
      updatePos,
      posX,
      posY,
      canvas,
    };
  },
};
</script>

<style lang="scss">
.wrapper-canvas {
  position: relative;
  overflow: hidden;
  flex-grow: 2;
}
.canvas {
  border: 1px solid #ccc;
}
</style>
