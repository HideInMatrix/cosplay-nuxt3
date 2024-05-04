<template>
  <div class="app-layout">
    <TopHeader></TopHeader>
    <div class="main-wrapper">
      <div class="main-body">
        <slot />
      </div>
      <div class="md:w-56 xl:w-64 shrink-0">
        <Adsbygoogle ad-slot="1013737103" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TopHeader from "~/components/TopHeader.vue";
</script>
<style scoped lang="scss">
.app-layout {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  overflow: auto;
}

.main-wrapper {
  display: flex;
  flex: 1 1 auto;
  overflow: auto;
}

.main-body {
  flex: 1 1 auto;
  overflow: auto;
}
</style>
