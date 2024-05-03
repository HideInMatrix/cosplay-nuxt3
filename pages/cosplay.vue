<template>
  <div class="flex justify-center items-center flex-col h-full px-10">
    <USkeleton class="flex-auto" v-show="cosplays.length == 0" />
    <ul class="grid grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6 gap-4 py-3">
      <li
        class="space-y-3 relative rounded-md"
        v-for="(item, index) in cosplays"
        @click="toView(item.id)"
        :key="index">
        <USkeleton
          class="h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]"
          v-if="!item.onload" />
        <NuxtImg
          :class="[
            'h-auto',
            'w-auto',
            'object-cover',
            'transition-all',
            'hover:scale-105',
            'aspect-[3/4]',
          ]"
          :src="item.cover"
          loading="lazy"
          @load="
            () => {
              item.onload = true;
            }
          "
          alt="" />
        <div class="space-y-1 text-md">
          <h3 class="font-medium leading-none truncate pr-9">
            {{ item.title }}
          </h3>
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
      :page-count="count"
      :total="total"
      v-model="page" />
  </div>
</template>

<script setup lang="ts">
import type { Cosplay } from "~/types/posts";

let page = ref(1);
let count = ref(20);
let total = ref(30);

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
  const { data, total: resultTotal } = await $fetch(`/api/cosplays/list`, {
    method: "get",
    params: params,
  });

  // 处理响应数据，这里显式检查 undefined 而不是仅根据 truthy 评估
  if (data !== undefined && total !== undefined) {
    cosplays.value = data!.map((item) => {
      item.onload = false;
      return item;
    });
    total.value = resultTotal!;
  } else {
    // 如果需要，可以在这里处理错误或者设置 coserList 和 total 为默认值
    cosplays.value = []; // 可设置为默认值
    total.value = 0; // 可设置为默认值
  }
};

watch([page, count], () => {
  fetchCoseplays();
});
onBeforeMount(() => {
  fetchCoseplays();
});
const router = useRouter();

const toView = (id: number) => {
  router.push(`/cosplays/${id}`);
};
</script>
<style scoped lang="scss"></style>
