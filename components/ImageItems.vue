<template>
  <NuxtLink
    class="space-y-3 relative flex flex-col relative"
    v-for="(item, index) in cosplays"
    :to="`/cosplay/${item.id}`"
    :key="index">
    <USkeleton
      class="h-auto w-auto object-cover transition-all aspect-[3/4] rounded-md absolute top-0 left-0"
      v-if="!item.onload" />
    <NuxtImg
      class="h-auto w-auto object-cover transition-all aspect-[3/4] rounded-md"
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
      <UAvatar :alt="item.tags?.name" size="sm" />
      <h3 class="font-medium leading-none text-sm ml-2 truncate">
        {{ item.tags?.name }}
      </h3>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Cosplay } from "~/types/posts";

defineProps({
  cosplays: {
    type: Array<Cosplay>,
    default: () => [],
  },
});
</script>
<style scoped lang="scss"></style>
