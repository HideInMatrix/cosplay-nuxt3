<template>
  <NuxtLink
    class="space-y-3 flex flex-col"
    v-for="(item, index) in cosplays"
    :to="`/cosplay/${item.id}`"
    :key="index">
    <USkeleton
      class="object-cover transition-all aspect-[3/4] rounded-md w-full h-full"
      v-if="!item.onload" />
    <NuxtImg
      quality="60"
      format="webp"
      class="w-249px h-332px object-cover transition-all aspect-[3/4] rounded-md"
      :src="item.cover"
      loading="lazy"
      v-show="item.onload"
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
