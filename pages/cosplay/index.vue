<template>
  <div class="flex justify-center items-center flex-col h-full">
    <ul
      class="grid grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6 gap-4 py-3 overflow-auto flex-auto h-full w-full">
      <ImageItems :cosplays="resp?.data || []"></ImageItems>
    </ul>
    <UPagination
      class="py-8"
      size="md"
      :page-count="count"
      :total="resp?.total"
      v-model="page" />
  </div>
</template>

<script setup lang="ts">
import ImageItems from "~/components/ImageItems.vue";

let page = ref(1);
let count = 30;

const {
  data: resp,
  pending,
  error,
  refresh,
} = useAsyncData("cosplays", () => {
  return $fetch("/api/cosplays/list", {
    params: {
      page: page.value,
      count: count,
    },
  });
});
// 如果需要，你也可以在这里处理错误
if (error.value) {
  // 处理错误
  throw createError({ statusCode: 500, statusMessage: error.value.message });
}

watch(
  () => page.value,
  () => {
    refresh();
  }
);
</script>
<style scoped lang="scss"></style>
