<template>
  <div class="app-layout">
    <TopHeader></TopHeader>
    <div class="main-wrapper">
      <div class="left-page md:w-40 xl:w-54 bg-white shrink-0 max-lg:hidden">
        <Adsbygoogle
          ad-format="auto"
          ad-slot="1013737103"
          :ad-style="{
            border: '1px solid #fff',
          }" />
      </div>
      <div class="main-body">
        <slot />
      </div>
      <div class="right-page md:w-40 xl:w-54 bg-white shrink-0 max-lg:hidden">
        <Adsbygoogle
          ad-format="autorelaxed"
          ad-slot="3412561938"
          :ad-style="{
            border: '1px solid #fff',
          }" />
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
}

.main-body {
  flex: 1 1 auto;
}
</style>
