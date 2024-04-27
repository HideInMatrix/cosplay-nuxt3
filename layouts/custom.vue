<template>
  <div class="app-layout">
    <TopHeader></TopHeader>
    <div class="main-wrapper">
      <div class="left-page md:w-40 xl:w-54 bg-white">left ads</div>
      <div class="main-body">
        <slot />
      </div>
      <div class="right-page md:w-40 xl:w-54 bg-white">right ads</div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "cosplay micromatrix",
  layout: "custom",
});
import TopHeader from "~/components/TopHeader.vue";
</script>
<style scoped lang="scss">
.app-layout {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
}

.main-wrapper {
  display: flex;
  flex: 1 1 auto;
}

.main-body {
  flex: 1 1 auto;
}
</style>
