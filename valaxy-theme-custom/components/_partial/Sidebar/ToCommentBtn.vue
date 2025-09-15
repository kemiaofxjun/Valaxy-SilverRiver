<!-- BackToComment.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { isClient } from '@vueuse/core'

const show = ref(false)

function scrollToComment() {
  if (!isClient) return
  document.getElementById('comment-anchor')?.scrollIntoView({ behavior: 'smooth' })
}

function update() {
  if (!isClient) return
  // 只要滚动超过 80px 就显示，不碰底
  show.value = window.scrollY > 80
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', update))
</script>

<template>
  <transition name="fade">
    <button
      v-show="show"
      aria-label="Go to comments"
      class="fixed bottom-20 right-6 z-50 button is-medium shadow-lg"
      @click="scrollToComment"
    >
      <span class="icon i-ic-baseline-comment" />
    </button>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>