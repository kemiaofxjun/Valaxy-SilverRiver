<script lang="ts" setup>
const upyun = {
  name: "Cloudflare R2存储",
  url: "https://dash.cloudflare.com/",
  logo: "https://favicon.im/dash.cloudflare.com",
};
</script>

<template>
  <div class="card">
    <div class="p-4">
      <div class="mb-3 text-sm">云存储提供商</div>
      <div class="max-h-fit overflow-y-auto">
        <a class="flex-center" :href="upyun.url" target="_blank" :title="upyun.name">
          <img
            class="upyun-logo"
            width="100"
            height="25"
            m="b-2px l-1 r-2"
            :src="upyun.logo"
            loading="lazy"
            :alt="upyun.name"
          />
        </a>
      </div>
    </div>
  </div>
</template>
