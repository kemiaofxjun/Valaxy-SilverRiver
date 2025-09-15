<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { isClient } from '@vueuse/core'

const show = ref(false)

function backToBottom() {
  if (!isClient) return
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

/* 滚动监听 */
function update() {
  if (!isClient) return
  // 剩余高度 < 80px 就认为“已在底部”
  const remain = document.body.scrollHeight - window.innerHeight - window.scrollY
  show.value = remain > 80
}

onMounted(() => {
  window.addEventListener('scroll', update, { passive: true })
  update() // 初始化一次
})
onUnmounted(() => window.removeEventListener('scroll', update))
</script>

<template>
  <transition name="fade">
    <button
      v-show="show"
      aria-label="Back to bottom"
      class="button is-medium"
      @click="backToBottom()"
    >
      <span class="icon i-ic-baseline-arrow-downward" />
    </button>
  </transition>
</template>

<style scoped>
/* 可选：简单淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>