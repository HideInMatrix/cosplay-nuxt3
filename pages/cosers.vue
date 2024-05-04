<template>
  <div class="flex justify-center items-center flex-col h-full">
    <UInput
      v-model="cosersName"
      name="cosersName"
      placeholder="名字搜索"
      icon="i-heroicons-magnifying-glass-20-solid"
      autocomplete="off"
      class="w-2/5 py-10"
      :ui="{ icon: { trailing: { pointer: '' } } }">
      <template #trailing>
        <UButton
          v-show="cosersName !== ''"
          color="gray"
          variant="link"
          icon="i-heroicons-x-mark-20-solid"
          :padded="false"
          @click="cosersName = ''" />
      </template>
    </UInput>
    <USkeleton class="flex-auto" v-show="coserList.length == 0" />
    <ul
      class="flex-auto grid grid-cols-2 lg:grid-cols-4 gap-8 gap-y-5 py-6 mt-4">
      <li
        class="flex items-center transition-all hover:bg-accent p-3 cursor-pointer h-fit"
        v-for="item in coserList"
        :key="item.id">
        <div
          class="relative flex justify-center items-center shrink-0 overflow-hidden rounded-full box-content border-2 border-solid border-inherit w-9 h-9">
          {{ item.name[0] }}
        </div>
        <h3 class="font-medium leading-none text-sm ml-2 truncate">
          {{ item.name }}
        </h3>
      </li>
    </ul>

    <UPagination
      class="py-10"
      size="md"
      :page-count="count"
      :total="total"
      v-model="page" />
  </div>
</template>

<script setup lang="ts">
import type { Tag } from "~/types/tag";

let cosersName = ref("");
let page = ref(1);
let count = ref(20);
let total = ref(30);
let coserList = ref<Tag[]>([]);
// 定义一个获取Coser数据的函数
const fetchCosers = async (shouldResetPage = false) => {
  // 如果需要重置页码
  if (shouldResetPage) {
    page.value = 1;
  }

  // 构造请求参数
  const params = {
    name: "",
    page: page.value,
    count: count.value,
  };

  if (cosersName.value.trim()) {
    params.name = cosersName.value.trim();
  }

  // 发起 API 请求
  const { data, total: resultCount } = await $fetch(`/api/cosers/tags`, {
    method: "get",
    params: params,
  });

  // 处理响应数据，这里显式检查 undefined 而不是仅根据 truthy 评估
  if (data !== undefined && total !== undefined) {
    coserList.value = data!;
    total.value = resultCount!;
  } else {
    // 如果需要，可以在这里处理错误或者设置 coserList 和 total 为默认值
    coserList.value = []; // 可设置为默认值
    total.value = 0; // 可设置为默认值
  }
};

// 使用 Nuxt3 的 useDebounce 函数创建一个防抖函数
const debouncedFetchData = useDebounce(fetchCosers, 250);

// 监听 cosersName 的变化
watch(cosersName, () => {
  // Trigger the debounced search function
  debouncedFetchData(true);
});

// 监听页码和数量的变化
watch([page, count], () => {
  // Fetch the data without resetting the page
  fetchCosers();
});

onBeforeMount(() => {
  fetchCosers();
});
</script>
<style scoped lang="scss"></style>
~/types/tag
