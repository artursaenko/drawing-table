<template>
  <main>
    <section class="section">
      <div class="container">
        <div class="row">
          <DrawingTools :options="options" :resetClass="resetClass" />
          <Canvas :resetClass="resetClass" />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { reactive } from "vue";
import Canvas from "@/components/Canvas.vue";
import DrawingTools from "@/components/DrawingTools.vue";

export default {
  name: "Home",
  components: { Canvas, DrawingTools },
  setup() {
    let options = reactive([
      { icon: "font.png", type: "text", current: false, disabled: true },
      { icon: "picture-icon.png", type: "img", current: false, disabled: true },
      { icon: "square.png", type: "square", current: false, disabled: true },
      {
        icon: "triangle.png",
        type: "triangle",
        current: false,
        disabled: true,
      },
      { icon: "circle.png", type: "circle", current: false, disabled: true },
      { icon: "bin.png", type: "delete", current: false, disabled: true },
      {
        icon: "download.png",
        type: "download",
        current: false,
        disabled: false,
      },
    ]);

    const resetClass = (icon = "") => {
      options = options.map((item) => {
        if (item.icon !== icon) item.current = false;
        return item;
      });
    };

    return { options, resetClass };
  },
};
</script>

<style lang="scss">
.section {
  padding: 20px 0;
}
</style>
