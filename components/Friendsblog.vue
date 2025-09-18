<script lang="ts" setup>
import { useRandomData } from "../valaxy-theme-custom/composables/helper";
import { onImgError } from "../valaxy-theme-custom/utils/index";
import { computed, ref } from "vue";

interface LinkType {
  title: string;
  url: string;
  icon: string;
  description: string;
  healthy?: boolean;
}

interface ApiResponse {
  version: string;
  content: LinkType[];
}

const loading = ref(true);

const props = defineProps<{
  links: string | ApiResponse;
  random: boolean;
  errorImg?: string;
}>();

const { data } = useRandomData(props.links, props.random);

const filteredData = computed(() => {
  // 处理可能的两种数据结构
  const rawData = data.value;
  let linksArray: LinkType[] = [];
  
  if (Array.isArray(rawData)) {
    linksArray = rawData;
  } else if (rawData && typeof rawData === 'object' && 'content' in rawData) {
    linksArray = rawData.content;
  }

  const result = linksArray.filter((link) => link.healthy !== false);
  if (result.length > 0 || rawData !== undefined) {
    loading.value = false;
  }
  return result;
});

function onError(e: Event) {
  onImgError(e, props.errorImg);
}

const placeholderCount = 10;
const placeholders = Array(placeholderCount).fill(null);
</script>

<template>
  <!-- 模板部分保持不变 -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <template v-if="loading">
      <div v-for="(_, index) in placeholders" :key="index" class="box !mb-0">
        <div class="media flex items-center">
          <div class="media-left mr-3">
            <div class="w-16 h-16 is-skeleton rounded-lg"></div>
          </div>
          <div class="media-content w-full">
            <div class="h-4 is-skeleton rounded w-3/4 mb-3"></div>
            <div class="h-3 is-skeleton rounded w-full"></div>
          </div>
        </div>
      </div>
    </template>

    <a 
      v-for="link in filteredData" 
      :key="link.url" 
      :href="link.url" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <div class="box h-full">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img
                width="64"
                height="64"
                :src="link.icon"
                alt="friend-links-avatar"
                @error="onError"
                loading="lazy"
                class="rounded-lg"
              />
            </figure>
          </div>
          <div class="media-content truncate">
            <div class="content text-nowrap">
              <p class="truncate">
                <strong>{{ link.title }}</strong>
                <br />
                {{ link.description }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </a>
  </div>
</template>