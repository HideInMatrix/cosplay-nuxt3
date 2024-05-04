<template>
  <!-- <div class="app-layout">
    <div class="main-wrapper">
      <div class="main-body">
        <slot />
      </div>
      <div class="md:w-56 xl:w-64 shrink-0 max-lg:hidden">
        <Adsbygoogle ad-slot="1013737103" />
      </div>
    </div>
  </div> -->
  <main class="flex">
    <div
      class="hidden md:block relative md:w-56 xl:w-64 h-screen border-r border-r-border">
      <div class="h-16"></div>
      <UDivider />
      <Menu></Menu>
      <div class="absolute p-3 bottom-0 w-full">
        <UButton color="black" variant="solid" block>登陆</UButton>
      </div>
    </div>
    <div
      dir="ltr"
      class="relative flex flex-col items-center w-full md:w-[calc(100vw-14rem)] xl:w-[calc(100vw-16rem)] h-screen overflow-hidden right-body">
      <div
        class="flex justify-center items-center text-lg font-semibold py-3 px-4">
        <NuxtImg
          class="w-10 h-10 mr-4"
          src="icon/favicon.ico"
          alt="Favicon"></NuxtImg>
        <div class="text-lg font-semibold">Share Cosplay</div>
      </div>
      <UDivider />
      <div class="w-full px-8 overflow-auto flex-auto">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import Menu from "~/components/Menu.vue";
</script>
<style scoped lang="scss">
.right-body {
  position: relative;
  --radix-scroll-area-corner-width: 0px;
  --radix-scroll-area-corner-height: 0px;
}
[data-radix-scroll-area-viewport] {
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}
[data-radix-scroll-area-viewport]::-webkit-scrollbar {
  display: none;
}
</style>
