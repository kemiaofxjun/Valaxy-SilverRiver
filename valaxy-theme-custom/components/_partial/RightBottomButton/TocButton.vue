<!-- PostToc.vue（目录组件） -->
<script setup lang="ts">
import { useOutline } from 'valaxy'
import { ref, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { isClient } from '@vueuse/core'

const { t } = useI18n()
const { headers, handleClick } = useOutline()
const OutlineItemShow = ref(false)

const closeOutline = () => { OutlineItemShow.value = false }

/* ---------- 去评论区 ---------- */
function scrollToComment() {
  if (!isClient) return
  document.getElementById('comment-anchor')?.scrollIntoView({ behavior: 'smooth' })
  closeOutline()          // 可选：点完后自动合起目录
}
</script>

<template>
  <!-- 1. 触发目录的按钮 -->
  <button
    aria-label="Open post toc"
    @click="OutlineItemShow = !OutlineItemShow"
    class="button is-medium"
  >
    <span class="icon i-ic-baseline-toc"></span>
  </button>

  <!-- 2. 目录弹窗 -->
  <div
    v-if="OutlineItemShow"
    class="fixed bottom-0 right-0 m-8 z-15 w-64"
  >
    <div class="card">
      <div class="card-content">
        <!-- 标题行：TOC + 去评论 + 关闭 -->
        <div class="flex items-center justify-between mb-3">
          <div class="text-sm font-semibold">{{ t('aside.toc') }}</div>
          <div class="flex items-center space-x-2">
            <!-- 去评论区 -->
            <button
              aria-label="Go to comments"
              @click="scrollToComment"
              class="button is-small is-ghost"
            >
              <span class="icon i-ic-baseline-comment" />
            </button>
            <!-- 关闭目录 -->
            <button aria-label="Close post toc" @click="closeOutline">
              <span class="icon i-ri-close-line" />
            </button>
          </div>
        </div>

        <!-- 目录树 -->
        <div class="max-h-38 overflow-y-auto">
          <OutlineItem
            :headers="headers"
            :on-click="handleClick"
            root
            @click="OutlineItemShow = false"
            @close-menu="closeOutline"
          />
        </div>
      </div>
    </div>
  </div>
</template>