<!-- PostToc.vue / OutlineCard.vue -->
<script setup lang="ts">
import { useOutline } from 'valaxy'
import { useI18n } from 'vue-i18n'
import { isClient } from '@vueuse/core'

const { headers, handleClick } = useOutline()
const { t } = useI18n()

/* ---------- 直达评论区 ---------- */
function scrollToComment() {
  if (!isClient) return
  document.getElementById('comment-anchor')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="card !mb-0 relative">
    <!-- 右上角图标按钮 -->
    <button
      aria-label="Go to comments"
      @click="scrollToComment"
      class="absolute top-2 right-2 button is-small is-ghost"
    >
      <span class="icon i-ic-baseline-comment" />
    </button>

    <div class="p-4">
      <div class="mb-3 text-sm">{{ t('aside.toc') }}</div>
      <div class="max-h-38 overflow-y-auto">
        <OutlineItem :headers="headers" :on-click="handleClick" root />
        <div v-if="headers.length === 0" class="text-gray-500 text-center">
          {{ t('aside.no_toc') }}
        </div>
      </div>
    </div>
  </div>
</template>