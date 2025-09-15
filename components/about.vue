<!-- Valaxy 主题 About.vue -->
<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { reactive, computed } from 'vue'
import { useAddonVercount } from 'valaxy-addon-vercount'
const { page, site } = useAddonVercount()

/* =================  所有信息写死在这里  ================= */
const author = reactive({
  name: '克喵',
  birthYear: 2005,
  motto: ['愿你看清一切真相后', '依旧热爱你的家人和朋友'],
  tags: ['学生', '资源分享者', '博主'],
  focus: '小说、PC 游戏',
  music: '古风、摇滚等等我喜欢就听',
  personality: { type: 'INFJ-T', link: 'https://www.16personalities.com/' },
  specialty: ['平平无奇的“摆烂”者', '英语指数 MAX'],
  contact: {
    github: 'https://github.com/Kemeow815',
    email: 'mailto:me@mail.kemeow.top',
    telegram: 'https://t.me/KemiaoJun',
    twitter: 'https://x.com/kemiaofxjun',
    qq: 'https://qm.qq.com/q/9sljinl6rC',
    bilibili: 'https://space.bilibili.com/3546643173477234',
  },
})

/* 简单假数据 */
// const stats = ref({
//   pv: 12345,
//   uv: 2345,
//   visits: 3456,
//   mins: 6789,
// })

const age = computed(() => new Date().getFullYear() - author.birthYear)

useHead({
  title: '关于',
  meta: [{ name: 'description', content: `关于 ${author.name} 以及这个博客的一切。` }],
})
</script>

<template>
  <div class="about-page">
    <header class="about-header">
      <h1>关于我</h1>
      <p>总有些事情比永恒更重要！</p>
    </header>

    <div class="cards-grid">
      <!-- 简介 -->
      <div class="card intro-card">
        <p>你好，很高兴认识你👋</p>
        <h2>我叫 {{ author.name }}</h2>
        <p>{{ author.tags.join('、') }}</p>
        <div class="i-ph-rocket-launch-bold card-bg-icon" />
      </div>

      <!-- 年龄 -->
      <div class="card info-card">
        <div class="info-item">
          <span class="label">生于</span>
          <span class="value">{{ author.birthYear }}</span>
        </div>
        <div class="info-item">
          <span class="label">当前</span>
          <span class="value">{{ age }} 岁 👨‍🎓</span>
        </div>
        <div class="i-ph-calendar-blank-bold card-bg-icon" />
      </div>

      <!-- 座右铭 -->
      <div class="card motto-card">
        <span class="label">座右铭</span>
        <p v-for="(t, i) in author.motto" :key="i">{{ t }}</p>
        <div class="i-ph-heart-bold card-bg-icon" />
      </div>

      <!-- 关注偏好（整块中央） -->
      <div class="card tech-card">
        <span class="label">关注偏好</span>
        <h3>资源分享</h3>
        <p>{{ author.focus }}</p>
        <div class="i-ph-desktop-tower-bold card-bg-icon" />
      </div>

      <!-- 音乐（整块中央） -->
      <div class="card music-card">
        <span class="label">音乐偏好</span>
        <h3>{{ author.music }}</h3>
        <div class="i-ph-music-notes-simple-bold card-bg-icon" />
      </div>

      <!-- 性格（整块中央） -->
      <div class="card personality-card">
        <span class="label">性格</span>
        <span class="value text-gray">提倡者</span>
        <span class="value-small text-gray">{{ author.personality.type }}</span>
        <a :href="author.personality.link" target="_blank" class="card-link">在 16personalities 了解更多</a>
        <div class="i-ph-user-focus-bold card-bg-icon" />
      </div>

      <!-- 特长 -->
      <div class="card specialty-card">
        <span class="label">特长</span>
        <p v-for="t in author.specialty" :key="t" class="specialty-text">
          <span class="highlight">{{ t }}</span>
        </p>
        <div class="i-ph-game-controller-bold card-bg-icon" />
      </div>

      <!-- 联系方式 -->
<!-- 联系方式 -->
<div class="card contact-card">
  <span class="label">联系我</span>
  <div class="contact-links">
    <a href="https://github.com/Kemeow815" target="_blank" title="github">
      <div class="i-ph-github-logo-fill" />
    </a>
    <a href="mailto:me@mail.kemeow.top" target="_blank" title="email">
      <div class="i-ph-envelope-simple-fill" />
    </a>
    <a href="https://t.me/KemiaoJun" target="_blank" title="telegram">
      <div class="i-ri-telegram-fill" />
    </a>
    <a href="https://x.com/kemiaofxjun" target="_blank" title="twitter">
      <div class="i-ri-twitter-fill" />
    </a>
    <a href="https://qm.qq.com/q/9sljinl6rC" target="_blank" title="qq">
      <div class="i-ri-qq-fill" />
    </a>
    <a href="https://space.bilibili.com/3546643173477234" target="_blank" title="bilibili">
      <div class="i-ant-design-bilibili-filled" />
    </a>
  </div>
  <div class="i-ph-address-book-bold card-bg-icon" />
</div>

      <!-- 统计 -->
<!-- 网站统计：使用 valaxy-addon-vercount -->
<div class="card stats-card">
  <span class="label">网站统计</span>

  <!-- 未加载完成时 -->
  <div v-if="!site.pv" class="stats-loading">加载中...</div>

  <!-- 加载完成后 -->
  <div v-else class="stats-content">
    <h3>总览统计</h3>
    <div class="stats-grid">
      <div class="stat-item">
        <span class="stat-value">{{ site.pv }}</span>
        <span class="stat-label">站点浏览量</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ site.uv }}</span>
        <span class="stat-label">站点访客数</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ page.pv }}</span>
        <span class="stat-label">本文浏览量</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ page.uv }}</span>
        <span class="stat-label">本文访客数</span>
      </div>
    </div>
  </div>

  <div class="i-ph-chart-line-fill card-bg-icon" />
</div>
    </div>
  </div>
</template>

<style scoped>
/* ---------- 公共部分 ---------- */
.about-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
  animation: float-in 0.3s backwards;
}
.about-header {
  margin-bottom: 3rem;
  text-align: center;
}
.about-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
}
.about-header p {
  font-size: 1.2rem;
  color: var(--c-text-2);
}
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
.card {
  position: relative;
  overflow: hidden;
  min-height: 220px;
  padding: 2rem 1.5rem;
  border: 1px solid var(--c-border);
  border-radius: 1.5rem;
  background-color: var(--c-bg-soft);
  text-align: center;
}
.card .label {
  position: absolute;
  top: 1rem;
  left: 1.5rem;
  font-size: 0.8rem;
  color: var(--c-text-2);
}
.card-bg-icon {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  font-size: 5rem;
  opacity: 0.1;
  color: var(--c-text-1);
  pointer-events: none;
}

/* ---------- 简介 ---------- */
.intro-card {
  grid-column: 1 / -1;
}
.intro-card h2 {
  margin: 0.5rem 0;
  font-size: 3rem;
  font-weight: bold;
}

/* ---------- 年龄 ---------- */
.info-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.info-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
}
.info-item .value {
  font-size: 2.5rem;
  font-weight: bold;
}

/* ---------- 座右铭 ---------- */
.motto-card p {
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 1.2;
}

/* ---------- 统一居中：关注偏好 | 音乐 | 性格 ---------- */
.tech-card,
.music-card,
.personality-card {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 上下居中 */
  align-items: center;     /* 左右居中 */
  gap: 0.4rem;             /* 文字块之间留空隙 */
}

/* 特长 */
.specialty-text {
  margin: 0.2em 0;
  font-size: 1.8rem;
  font-weight: bold;
}
.highlight {
  font-size: 2.5rem;
  color: var(--c-primary);
}

/* 联系方式 */
.contact-card {
  grid-column: 1 / -1;
}
.contact-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 400px;
  margin: 0 auto;
}
.contact-links a {
  font-size: 2.5rem;
  color: var(--c-text-1);
  transition: transform 0.2s;
}
.contact-links a:hover {
  color: var(--c-primary);
  transform: scale(1.1);
}

/* 统计 */
.stats-card {
  grid-column: 1 / -1;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
}
.stat-value {
  margin-bottom: 0.25rem;
  font-size: 2rem;
  font-weight: bold;
  color: var(--c-text-1);
}
.stat-label {
  font-size: 0.9rem;
  color: var(--c-text-2);
}
</style>