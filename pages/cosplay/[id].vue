<template>
  <div class="flex flex-col lg:flex-row px-8">
    <div class="w-full">
      <div class="flex justify-between items-center py-3">
        <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight">
          {{ cosplayer?.title }}
        </h2>
      </div>
      <div class="flex space-x-4 mt-4 mb-6">
        <p class="text-sm text-muted-foreground">
          {{ cosplayer?.creation_date }}
        </p>
      </div>
      <div class="flex flex-col items-center">
        <div
          v-viewer
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 w-full cursor-zoom-in">
          <NuxtImg
            v-for="item in images"
            :class="[
              'h-auto',
              'w-auto',
              'object-cover',
              'transition-all',
              'hover:scale-105',
              'aspect-[3/4]',
              'rounded-md',
            ]"
            :src="item"
            loading="lazy"
            alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "nuxt/app";
import type { Cosplay } from "~/types/posts";

const route = useRoute();
let cosplayer = ref<Cosplay | null>();
const images = ref<string[]>([]);
const extractImageSources = (markdownText: string) => {
  const regex = /!\[\]\((.*?)\)/g;
  let match;

  while ((match = regex.exec(markdownText)) !== null) {
    images.value.push(match[1]);
  }
};

const fetchImages = async () => {
  // 如果需要重置页码

  // 构造请求参数
  const params = {
    id: route.params.id,
  };

  // 发起 API 请求
  const { data } = await $fetch(`/api/cosplays/getImagesById`, {
    method: "get",
    params: params,
  });

  // 处理响应数据，这里显式检查 undefined 而不是仅根据 truthy 评估
  if (data !== undefined) {
    cosplayer.value = data!;
    extractImageSources(cosplayer.value.content || "");
  } else {
    // 如果需要，可以在这里处理错误或者设置 coserList 和 total 为默认值
    cosplayer.value = null; // 可设置为默认值
  }
};

onBeforeMount(() => {
  fetchImages();
});
</script>
<style scoped lang="scss"></style>