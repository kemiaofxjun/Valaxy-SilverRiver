<template>
  <div v-if="err">出现错误：{{ err }}</div>
  <div class="menu" v-else>
    <ul
      class="menu-list"
    >
      <li v-for="n in 16" :key="n" v-if="isLoading" class="w-full" :class="{ 'is-skeleton': isLoading }">
        <p class="p-2 min-h-9">
          
        </p>
      </li>
      <li v-for="link in friendLinks" :key="link.link" v-else>
        <a :href="link.link" target="_blank">
          {{ link.name }}
        </a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const isLoading = ref(true);
const err = ref<string | null>(null);

interface FriendLink {
  avatar: string;
  link: string;
  // color: string;
  descr: string;
  name: string;
  // url: string;
}

let friendLinks = ref<FriendLink[]>([]);

onMounted(async () => {
  try {
    const response = await axios.get(
      "https://link-app.20050815.xyz/api/links?status=approved"
    );
    friendLinks.value = shuffleArray(response.data);
  } catch (error) {
    err.value = error as any;
    console.error("获取友情链接数据失败:", error);
  } finally {
    isLoading.value = false;
  }
});

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
</script>
