<script setup lang="ts">
import { isClient } from "@vueuse/core";
import { useScroll, useElementBounding } from "@vueuse/core";
import { computed, ref } from "vue";

const buttonRef = ref<HTMLButtonElement | null>(null);
const { y: scrollY } = useScroll(isClient ? window : null);
const { height: buttonHeight } = useElementBounding(buttonRef);

const isVisible = computed(() => scrollY.value >= (buttonHeight.value || 0) * 2);

function backToTop() {
  if (!isClient) return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <button
    ref="buttonRef"
    aria-label="Back to top"
    @click="backToTop()"
    class="button is-medium back-to-top"
    :style="{
      transform: `translateY(-${(buttonHeight || 0) * 1}px)`,
      opacity: isVisible ? 1 : 0,
      pointerEvents: isVisible ? 'auto' : 'none',
    }"
  >
    <span class="icon i-ic-baseline-arrow-upward"></span>
  </button>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
</style>