<template>
  <Head>
    <title>{{ t("not_found.title") }}</title>
  </Head>
  <Layout>
    <main class="main">
      <div class="flex justify-center items-center h-screen">
        <div class="grid content text-center">
          <h1>Oops!</h1>
          <p>{{ t("not_found.message") }}</p>
          <RouterLink class="button" to="/">{{
            t("not_found.back_to_home")
          }}</RouterLink>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script setup lang="ts">
import { Head } from "@unhead/vue/components";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
