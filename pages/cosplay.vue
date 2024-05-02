<template>
  <div class="flex justify-center items-center flex-col h-full px-10">
    <USkeleton
      class="flex-auto"
      v-show="cosplays.length == 0"
      :ui="{ rounded: 'rounded-full' }" />
    <ul class="grid grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6 gap-4 py-3">
      <li
        class="space-y-3 relative rounded-md"
        v-for="(item, index) in cosplays"
        @click="toView(item.id)"
        :key="index">
        <NuxtImg
          :class="[
            'h-auto',
            'w-auto',
            'object-cover',
            'transition-all',
            'hover:scale-105',
            'aspect-[3/4]',
            item.onload ? '' : 'skeleton-image',
          ]"
          :src="item.cover"
          loading="lazy"
          @load="
            () => {
              const cosplayItem = cosplays.find((c) => c.id === item.id);
              if (cosplayItem) {
                cosplayItem.onload = true;
              }
            }
          "
          alt="" />
        <div class="space-y-1 text-md">
          <h3 class="font-medium leading-none truncate pr-9">
            {{ item.title }}
          </h3>
          <!-- <p class="text-xs text-muted-foreground truncate">
            {{ item.tag_id }}
          </p> -->
        </div>
        <div class="flex items-center h-8">
          <div
            class="relative flex justify-center items-center shrink-0 overflow-hidden rounded-full box-content border-2 border-solid border-inherit w-9 h-9">
            {{ item.tags?.name[0] }}
          </div>
          <h3 class="font-medium leading-none text-sm ml-2 truncate">
            {{ item.tags?.name }}
          </h3>
        </div>
      </li>
    </ul>
    <UPagination
      class="py-2"
      size="md"
      :max="5"
      :page-count="count"
      :total="total"
      v-model="page" />
  </div>
</template>

<script setup lang="ts">
import type { Cosplay } from "~/types/posts";

let page = ref(1);
let count = ref(20);
let total = ref(0);

let cosplays = ref<Cosplay[]>([]);

const fetchCoseplays = async (shouldResetPage = false) => {
  // 如果需要重置页码
  if (shouldResetPage) {
    page.value = 1;
  }

  // 构造请求参数
  const params = {
    title: "",
    page: page.value,
    count: count.value,
  };

  // 发起 API 请求
  const { data: resp } = await useFetch(`/api/cosplays/list`, {
    method: "get",
    params: params,
  });

  // 处理响应数据，这里显式检查 undefined 而不是仅根据 truthy 评估
  if (
    resp.value &&
    resp.value.data !== undefined &&
    resp.value.total !== undefined
  ) {
    cosplays.value = resp.value.data!.map((item) => {
      item.onload = false;
      return item;
    });
    total.value = resp.value.total!;
  } else {
    // 如果需要，可以在这里处理错误或者设置 coserList 和 total 为默认值
    cosplays.value = []; // 可设置为默认值
    total.value = 0; // 可设置为默认值
  }
};

watch(
  [page, count],
  () => {
    fetchCoseplays();
  },
  { immediate: true }
);
const router = useRouter();

const toView = (id: number) => {
  router.push(`/cosplays/${id}`);
};
</script>
<style scoped lang="scss">
.skeleton-image {
  background-color: #ddd; // 灰色背景
  width: 100%; // 根据需要设置宽度
  height: 100%; // 为0意味着使用padding来设定高度
  padding-top: 75%; // 通过padding-top的百分比来设定高宽比，比如4:3比例就是 (3 / 4 * 100)%
  position: relative;
  overflow: hidden;
  border-radius: 0.25rem; // 圆角的大小
}

.skeleton-image::after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 0;
  transform: scale(1.02);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
