<template>
  <NuxtLink
    class="transition-all hover:scale-105"
    v-for="(item, index) in cosplays"
    :to="`/cosplay/${item.id}`"
    :key="index">
    <USkeleton
      class="relative w-full h-32 xl:h-36 2xl:h-32 object-cover rounded-md absolute"
      v-if="!item.onload" />
    <NuxtImg
      class="relative w-full h-32 xl:h-36 2xl:h-32 object-cover rounded-md"
      :src="item.cover"
      loading="lazy"
      @load="
        () => {
          item.onload = true;
        }
      "
      alt="" />
    <small class="mt-2 h-10 text-sm font-medium line-clamp-2"></small>
    <div class="flex justify-between mt-2">
      <small class="text-sm text-muted-foreground">{{
        item.creation_date
      }}</small>
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
