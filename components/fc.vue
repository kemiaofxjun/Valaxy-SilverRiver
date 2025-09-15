<template>
  <div id="friend-circle-container">与主机通讯中……</div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 设置全局配置
  if (typeof window.UserConfig === 'undefined') {
    window.UserConfig = {
      private_api_url: 'https://fc-main.kemeow.top/',
      page_turning_number: 24,
      error_img: 'https://fastly.jsdelivr.net/gh/Rock-Candy-Tea/Friend-Circle-Frontend/logo.png',
    }
  }

  // 动态加载外部 JS
  const script = document.createElement('script')
  script.src = 'https://fastly.jsdelivr.net/gh/Rock-Candy-Tea/Friend-Circle-Frontend/hexo-theme-butterfly/imm.min.js'
  script.async = true
  document.body.appendChild(script)
})
</script>

<style scoped>
@import url('https://fastly.jsdelivr.net/gh/Rock-Candy-Tea/Friend-Circle-Frontend/hexo-theme-butterfly/imm.min.css');
</style>
