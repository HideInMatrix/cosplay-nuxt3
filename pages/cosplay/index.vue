<template>
  <div class="flex justify-center items-center flex-col h-full">
    <USkeleton class="flex-auto" v-show="cosplays.length == 0" />
    <ul
      class="grid grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6 gap-4 py-3 overflow-auto flex-auto">
      <ImageItems :cosplays="cosplays"></ImageItems>
    </ul>
    <UPagination
      class="py-8"
      size="md"
      :page-count="count"
      :total="total"
      v-model="page" />
  </div>
</template>

<script setup lang="ts">
import ImageItems from "~/components/ImageItems.vue";
import { fetchCoseplays, cosplays, total } from "~/hooks/getCosplays";

let page = ref(1);
let count = ref(30);

watch([page, count], async () => {
  cosplays.value = []; // 可设置为默认值
  fetchCoseplays({ page: page.value, count: count.value });
});
onBeforeMount(async () => {
  fetchCoseplays({});
});
</script>
<style scoped lang="scss"></style>
