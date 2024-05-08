<template>
  <div class="w-full px-8 h-full flex flex-col">
    <!-- 背景 -->
    <div class="relative h-1/4">
      <NuxtImg
        class="h-full w-full object-cover"
        loading="lazy"
        src="https://image.sharecosplay.com/7f3a85e1-542b-4907-83bf-69a33c1aeb9c" />
    </div>
    <!-- 简介 -->
    <div
      class="flex items-end p-3 md:px-6 md:pb-4 md:pt-3 border border-solid border-gray-200">
      <NuxtImg
        class="w-20 md:w-32 h-20 md:h-32 p-1 md:p-2 border border-solid border-gray-200 bg-white -mt-16 z-10"
        src="https://image.sharecosplay.com/c1f80a76-9e46-4a63-b00d-fc52fe8e8a37"
        loading="lazy" />

      <div class="ml-4 md:ml-5 w-full -mt-16 md:mt-0 z-10">
        <h4
          class="scroll-m-20 text-xl font-semibold tracking-tight text-white md:text-slate-950 mb-1 md:mb-2">
          {{ coseInfo?.name }}
        </h4>
      </div>
    </div>
    <!-- 筛选框 -->
    <div
      class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 my-6">
      <UInput
        v-model="productionName"
        name="cosersName"
        placeholder="名字搜索"
        icon="i-heroicons-magnifying-glass-20-solid"
        autocomplete="off"
        class="px-px items-center lg:w-1/2 xl:w-2/5"
        :ui="{ icon: { trailing: { pointer: '' } } }">
        <template #trailing>
          <UButton
            v-show="productionName !== ''"
            color="gray"
            variant="link"
            icon="i-heroicons-x-mark-20-solid"
            :padded="false"
            @click="productionName = ''" />
        </template>
      </UInput>
    </div>

    <!-- 作品集 -->
    <div
      class="grid grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6 gap-4 flex-auto overflow-auto">
      <ImageItems :cosplays="cosplays"></ImageItems>
    </div>
    <UPagination
      class="py-8 justify-center"
      size="md"
      :page-count="count"
      :total="total"
      v-model="page" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "nuxt/app";
import ImageItems from "~/components/ImageItems.vue";
import {
  fetchCoseplays,
  cosplays,
  total,
} from "~/hooks/getCosplaysByTagAndTitle";
import { getCoserInfo, coseInfo } from "~/hooks/getCosersInfo";

const route = useRoute();

let page = ref(1);
let count = ref(30);

const productionName = ref("");
// 使用 Nuxt3 的 useDebounce 函数创建一个防抖函数
const debouncedFetchData = useDebounce(fetchCoseplays, 250);

// 监听 cosersName 的变化
watch(productionName, () => {
  // Trigger the debounced search function
  debouncedFetchData({
    title: productionName.value,
    tagId: route.params.id as string,
  });
});

watch([page, count], async () => {
  cosplays.value = []; // 可设置为默认值
  fetchCoseplays({
    title: productionName.value,
    tagId: route.params.id as string,
  });
});
onBeforeMount(async () => {
  getCoserInfo(route.params.id as string);
  fetchCoseplays({
    title: productionName.value,
    tagId: route.params.id as string,
  });
});
</script>
<style scoped lang="scss"></style>
~/hooks/getCosplaysByTagAndTitle
