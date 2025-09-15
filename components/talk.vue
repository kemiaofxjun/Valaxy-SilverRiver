<template>
  <div id="my-shouts-container"></div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const scriptUrl = 'https://cdn.jsdelivr.net/npm/kemiaofxjun-cdn/js/qexo-talk/talk.js'

  if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
    const script = document.createElement('script')
    script.src = scriptUrl
    script.async = true

    script.onload = () => {
      waitForGlobal('myQexoShouts', 100, 30)
        .then(() => {
          // 如果变量没挂到 window，就手动挂上去
          if (!window.myQexoShouts && typeof myQexoShouts !== 'undefined') {
            window.myQexoShouts = myQexoShouts
          }

          window.myQexoShouts.init({
            el: '#my-shouts-container',
            avatar: 'https://img.314926.xyz/images/2025/08/13/no-background-kemiaofxjun.webp',
            name: '克喵爱吃卤面',
            limit: 10,
            baseURL: 'https://qexo.kemeow.top',
          }).catch((error) => {
            console.error('加载过程中出现问题:', error)
          })
        })
        .catch(() => {
          console.error('myQexoShouts 未定义，可能是脚本未正确注册')
        })
    }

    script.onerror = () => {
      console.error('talk.js 加载失败，请检查 CDN 链接或网络')
    }

    document.body.appendChild(script)
  }

  function waitForGlobal(key, interval = 100, maxTries = 30) {
    return new Promise((resolve, reject) => {
      let tries = 0
      const timer = setInterval(() => {
        if (window[key] || typeof myQexoShouts !== 'undefined') {
          clearInterval(timer)
          resolve()
        } else if (++tries >= maxTries) {
          clearInterval(timer)
          reject()
        }
      }, interval)
    })
  }
})
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/kemiaofxjun-cdn/css/qexo-talk/talk.css');
</style>
