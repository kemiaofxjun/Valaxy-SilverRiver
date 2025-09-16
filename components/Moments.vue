<template>
  <section class="moments-wrap">
    <!-- 单条短文 -->
    <article v-for="m in paginated" :key="m.id" class="moment-card">
      <header class="moment-header">
        <img :src="author(m).avatar" :alt="author(m).name" class="author-avatar">
        <div class="author-info">
          <div class="author-line">
            <span class="author-name">{{ author(m).name }}</span>
            <span v-for="b in author(m).badges" :key="b" class="badge">{{ b }}</span>
          </div>
          <div class="meta">
            <time>{{ fmt(m.createdAt) }}</time>
            <span v-if="m.location" class="sep">·</span>
            <span v-if="m.location">{{ m.location }}</span>
          </div>
        </div>
      </header>
      <p class="moment-text">{{ m.content }}</p>
      <div v-if="m.images?.length" class="moment-imgs" :class="gridCls(m.images.length)">
        <img
          v-for="(img,idx) in m.images"
          :key="idx"
          :src="img"
          class="moment-img"
          @click="openPreview(m.images!, idx)"
        >
      </div>
    </article>

    <!-- 分页 -->
    <nav v-if="pageTotal > 1" class="moment-pager">
      <button :disabled="page === 1" @click="page--">上一页</button>
      <span>{{ page }} / {{ pageTotal }}</span>
      <button :disabled="page === pageTotal" @click="page++">下一页</button>
    </nav>

    <!-- 图片预览 -->
    <Teleport to="body">
      <div v-if="showPreview" class="preview-mask" @click="closePreview">
        <div
          class="preview-box"
          @click.stop
          @wheel.passive="onWheel"
          @mousedown="onMouseDown"
          @dblclick="resetTransform"
        >
          <button class="preview-close" title="关闭" @click="closePreview">✕</button>
          <img
            :src="previewList[previewIdx]"
            class="preview-img"
            :style="{
              transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
              cursor: dragging ? 'grabbing' : 'grab'
            }"
          >
          <div v-if="previewList.length > 1" class="preview-bar">
            <button @click="prev">‹</button>
            <span>{{ previewIdx + 1 }} / {{ previewList.length }}</span>
            <button @click="next">›</button>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import type { MomentItem } from '../data/moments'
import moments from '../data/moments'
import { ref, computed, onMounted, onUnmounted } from 'vue'

/* ---------------- 分页 ---------------- */
const pageSize = 5
const page = ref(1)
const pageTotal = computed(() => Math.ceil(moments.length / pageSize))
const paginated = computed(() => {
  const start = (page.value - 1) * pageSize
  return moments.slice(start, start + pageSize)
})

/* ---------------- 作者信息 ---------------- */
const defaultAuthor = {
  name: '克喵爱吃卤面',
  avatar: 'https://img.314926.xyz/images/2025/09/15/kemiaofxjun-avatar.webp',
  badges: ['阁主'],
}
const author = (m: MomentItem) => m.author || defaultAuthor

/* ---------------- 时间格式化 ---------------- */
const fmt = (d: string) =>
  new Date(d)
    .toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(/\//g, '-')

/* ---------------- 图片网格 ---------------- */
const gridCls = (n: number) => (n === 1 ? 'single' : 'grid')

/* ---------------- 预览 ---------------- */
const showPreview = ref(false)
const previewList = ref<string[]>([])
const previewIdx = ref(0)

function openPreview(images: string[], idx: number) {
  previewList.value = images
  previewIdx.value = idx
  showPreview.value = true
  resetTransform()
}
function closePreview() {
  showPreview.value = false
  resetTransform()
}
function prev() {
  previewIdx.value = (previewIdx.value - 1 + previewList.value.length) % previewList.value.length
  resetTransform()
}
function next() {
  previewIdx.value = (previewIdx.value + 1) % previewList.value.length
  resetTransform()
}

/* ---------------- 缩放 & 平移 ---------------- */
const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)
let dragging = false
let startX = 0, startY = 0

function resetTransform() {
  scale.value = 1
  translateX.value = 0
  translateY.value = 0
}
function onWheel(e: WheelEvent) {
  e.preventDefault()
  const delta = e.deltaY < 0 ? 1.1 : 0.9
  scale.value = Math.min(Math.max(scale.value * delta, 0.3), 5)
}
function onMouseDown(e: MouseEvent) {
  dragging = true
  startX = e.clientX - translateX.value
  startY = e.clientY - translateY.value
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}
function onMouseMove(e: MouseEvent) {
  if (!dragging) return
  translateX.value = e.clientX - startX
  translateY.value = e.clientY - startY
}
function onMouseUp() {
  dragging = false
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
}

/* ---------------- 键盘监听 ---------------- */
onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if (!showPreview.value) return
    if (e.key === 'Escape') closePreview()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'r' || e.key === 'R') resetTransform()
  }
  window.addEventListener('keydown', handler)
  onUnmounted(() => window.removeEventListener('keydown', handler))
})
</script>

<style scoped>
/* ==================== 原有样式（未改动） ==================== */
.moments-wrap{max-width:680px;margin:0 auto;padding:2rem 1rem}
.moment-card{background:var(--va-c-bg-soft);border:1px solid var(--va-c-divider);border-radius:12px;padding:1rem;margin-bottom:1.25rem;transition:transform .2s}
.moment-card:hover{transform:translateY(-2px)}
.moment-header{display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem}
.author-avatar{width:44px;height:44px;border-radius:50%;object-fit:cover}
.author-line{display:flex;align-items:center;gap:.5rem}
.author-name{font-weight:600;color:var(--va-c-text)}
.badge{font-size:.65rem;padding:2px 6px;border:1px solid var(--va-c-primary);color:var(--va-c-primary);border-radius:4px}
.meta{font-size:.85rem;color:var(--va-c-text-2);display:flex;gap:.25rem}
.moment-text{margin:.5rem 0;line-height:1.6;color:var(--va-c-text)}
.moment-imgs{display:grid;gap:6px;margin-top:.5rem;cursor:zoom-in}
.single{grid-template-columns:1fr}
.grid{grid-template-columns:repeat(3,1fr)}
.moment-img{width:100%;border-radius:8px;object-fit:cover;aspect-ratio:1}
.moment-pager{display:flex;justify-content:center;align-items:center;gap:1rem;margin-top:1.5rem}
.moment-pager button{padding:4px 12px;border:1px solid var(--va-c-primary);color:var(--va-c-primary);background:transparent;border-radius:6px;cursor:pointer;transition:all .2s}
.moment-pager button:disabled{opacity:.4;cursor:not-allowed}
.moment-pager button:hover:not(:disabled){background:var(--va-c-primary);color:var(--va-c-bg)}
.preview-mask{position:fixed;inset:0;background:rgba(0,0,0,.85);display:flex;align-items:center;justify-content:center;z-index:9999}
.preview-box{position:relative;max-width:90vw;max-height:90vh;background:var(--va-c-bg);border-radius:12px;overflow:hidden}
.preview-close{position:absolute;top:12px;right:12px;width:32px;height:32px;background:rgba(0,0,0,.6);color:#fff;border:none;border-radius:50%;cursor:pointer;font-size:18px}
.preview-bar{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:12px;background:rgba(0,0,0,.6);color:#fff;padding:6px 12px;border-radius:12px;font-size:14px}
.preview-bar button{background:none;border:none;color:#fff;font-size:20px;cursor:pointer;padding:0 6px}

/* =====  解决「只能看到一部分」的核心代码  ===== */
.preview-img{
  width: auto;
  height: auto;
  max-width: 90vw;          /* 视口宽 */
  max-height: 90vh;         /* 视口高 */
  object-fit: contain;      /* 完整显示 */
  display: block;
  margin: 0 auto;           /* 水平居中 */
  transition: none;         /* 拖拽时关闭过渡，避免卡顿 */
}

/* ==================== 深色/白天变量映射 ==================== */
.moments-wrap{
  --va-c-bg-soft: var(--va-c-bg-soft, #fafafa);
  --va-c-divider: var(--va-c-divider, #e5e5e5);
  --va-c-text: var(--va-c-text, #1a1a1a);
  --va-c-text-2: var(--va-c-text-2, #6b7280);
  --va-c-primary: var(--va-c-primary, #0078e7);
  --va-c-bg: var(--va-c-bg, #ffffff);
}
.dark .moments-wrap{
  --va-c-bg-soft: #1e1e1e;
  --va-c-divider: #333333;
  --va-c-text: #e5e5e5;
  --va-c-text-2: #a1a1a1;
  --va-c-primary: #5ca0ff;
  --va-c-bg: #121212;
}
</style>