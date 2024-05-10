<template>
  <div class="flex flex-col lg:flex-row px-8">
    <div class="w-full flex flex-col">
      <div class="flex justify-between items-center py-3">
        <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight">
          {{ cosplayer?.title }}
        </h2>
      </div>
      <div class="flex space-x-4 mt-4 mb-6">
        <p class="text-sm text-muted-foreground">
          {{ cosplayer?.creation_date }}
        </p>
        <p class="text-sm text-muted-foreground">•</p>
        <p class="text-sm text-muted-foreground">
          {{ cosplayer?.view_count || 0 }}&nbsp;浏览
        </p>
      </div>
      <div class="flex flex-col items-center">
        <div
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 w-full flex-auto">
          <ClientOnly>
            <NuxtLink
              data-fancybox="gallery"
              class="overflow-hidden"
              :href="item.src"
              v-for="item in temImages">
              <NuxtImg
                quality="60"
                class="w-249px h-332px object-cover transition-all hover:scale-105 aspect-[3/4] rounded-md bg-gray-100"
                :src="item.src"
                format="webp"
                loading="lazy" />
            </NuxtLink>
          </ClientOnly>
        </div>
        <UButton
          type="submit"
          color="black"
          class="mt-4"
          v-if="loadBtnFlag"
          size="xl"
          @click="loadMoreImages">
          加载更多
        </UButton>
      </div>
      <!-- 猜你喜欢 -->
      <div class="mt-6 mb-6">
        <p class="text-sm text-muted-foreground">猜你喜欢</p>
        <div class="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 gap-5 mt-5">
          <GuessLike :cosplays="cosplays"></GuessLike>
        </div>
        <Adsbygoogle ad-slot="1013737103" />
      </div>
    </div>
    <!-- <div class="ml-0 md:ml-8 mt-6 md:mt-0 min-w-64 max-w-64">
      <p class="text-sm text-muted-foreground">热门推荐</p>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "nuxt/app";
import type { Cosplay } from "~/types/posts";
import GuessLike from "~/components/GuessLike.vue";
import { fetchCoseplaysByTagId, cosplays } from "~/hooks/getCosplaysByTagId";
// import { dateFormat } from "~/public/utils/index";

const route = useRoute();
let cosplayer = ref<Cosplay | null>();
const images = ref<{ src: string; onload: boolean }[]>([]);
let temImages = ref<{ src: string; onload: boolean }[]>([]);
let loadedCount = ref(12);
let loadBtnFlag = ref(true);
const extractImageSources = (markdownText: string) => {
  const regex = /!\[\]\((.*?)\)/g;
  let match;

  while ((match = regex.exec(markdownText)) !== null) {
    images.value.push({ src: match[1], onload: false });
  }
  temImages.value = images.value.slice(0, 12);
};

const loadMoreImages = () => {
  // 一次获取12个数据
  const loadCount = 12;
  // 从已加载的数量开始，获取接下来的loadCount个数据
  for (
    let i = loadedCount.value;
    i < Math.min(loadedCount.value + loadCount, images.value.length);
    i++
  ) {
    temImages.value.push(images.value[i]);
  }
  // 更新已加载的数量
  loadedCount.value += loadCount;
  // 如果所有图像都已加载，则可以隐藏加载按钮
  if (loadedCount.value >= images.value.length) {
    // 隐藏加载更多的按钮 (这通常在模板中处理，例如通过v-if指令)
    loadBtnFlag.value = false;
  }
};

const fetchImages = async () => {
  // 如果需要重置页码

  // 构造请求参数
  const params = {
    id: route.params.id,
  };
  try {
    // 发起 API 请求
    const { data } = await $fetch(`/api/cosplays/getImagesById`, {
      method: "get",
      params: params,
    });

    // 处理响应数据，这里显式检查 undefined 而不是仅根据 truthy 评估
    if (data !== undefined) {
      cosplayer.value = data!;
      extractImageSources(cosplayer.value.content || "");
      fetchCoseplaysByTagId({
        count: 5,
        tagId: cosplayer.value?.tags?.id,
        filterId: +route.params.id,
      });
    } else {
      // 如果需要，可以在这里处理错误或者设置 coserList 和 total 为默认值
      cosplayer.value = null; // 可设置为默认值
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

const addView = async () => {
  try {
    // 构造请求参数
    const params = {
      postId: route.params.id,
    };

    let { viewCount } = await $fetch("/api/cosplays/countViewCosplay", {
      method: "post",
      params: params,
    });
    cosplayer.value!.view_count = viewCount;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

onBeforeMount(() => {
  fetchImages();
  addView();
});
</script>
<style scoped lang="scss"></style>
