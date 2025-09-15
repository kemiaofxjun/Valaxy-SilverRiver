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

onMounted(async () => {
  (app.showLoading = false), await import("@fontsource/noto-sans-sc/400.css");
});
</script>
<template>
  <PageLoading v-if="app.showLoading && theme.pageLoading" />
</template>
