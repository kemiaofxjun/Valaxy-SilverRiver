<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { isClient } from '@vueuse/core'

const show = ref(false)   // 控制按钮显隐

function scrollToComments() {
  if (!isClient) return
  document.getElementById('waline')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  // 只在客户端且 DOM 已生成后再显示按钮
  if (isClient && document.getElementById('waline')) {
    show.value = true
  }
})
</script>

<template>
  <button
    v-if="show"
    aria-label="Back to comments"
    title="回到评论"
    class="btn-floating btn-comments"
    @click="scrollToComments()"
  >
    <span class="icon i-ic-baseline-mode-comment" />
  </button>
</template>

<style scoped>
/* 与回到顶部按钮共用同一套悬浮样式 */
.btn-floating {
  position: fixed;
  right: 1.5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--va-c-bg-light);
  box-shadow: 0 2px 8px rgba(0,0,0,.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity .2s;
  z-index: 999;
}
.btn-floating:hover { opacity: .8; }

/* 评论区按钮放在回到顶部按钮上方 5rem */
.btn-comments { bottom: 5rem; }
</style>