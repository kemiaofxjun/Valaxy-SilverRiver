<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { onMounted, onBeforeMount } from "vue";
import { useAppStore, useSiteConfig } from "valaxy";
import { useRoute } from "vue-router";
import { useThemeConfig } from "./composables";
import { isClient } from "@vueuse/core";

const route = useRoute();
const site = useSiteConfig();
const theme = useThemeConfig();

useHead({
  link: [
    {
      rel: "canonical",
      href: site.value.url?.slice(0, -1) + route.path,
    },
    {
      rel: "preconnect",
      href: "https://objects.lihaoyu.cn",
    },
  ],
});

const app = useAppStore();

onBeforeMount(async () => {
  if (isClient) {
    const allowedDomains = [
      // blog.20050815.xyz
      [
        98, 108, 111, 103, 46, 50, 48, 48, 53, 48, 56, 49, 53, 46, 120, 121, 122,
      ],
      // localhost:4859
      [
        108, 111, 99, 97, 108, 104, 111, 115, 116, 58, 52, 56, 53, 57,
      ],
    ].map((domain) => String.fromCharCode(...domain));

    const currentDomain = window.location.host; // 注意：带端口用 host
    if (!allowedDomains.includes(currentDomain)) {
      window.location.href = "https://" + allowedDomains[0];
    }
  }
});

onMounted(async () => {
  (app.showLoading = false), await import("@fontsource/noto-sans-sc/400.css");
});
</script>
<template>
  <PageLoading v-if="app.showLoading && theme.pageLoading" />
</template>
