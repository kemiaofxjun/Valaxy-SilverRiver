<template>
  <div class="card !mb-0">
    <div class="p-4">
      <div class="mb-3 text-sm">{{ t("sidebar.pages") }}</div>
      <Pages />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>