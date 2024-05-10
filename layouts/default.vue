<template>
  <main class="flex w-full h-full">
    <LeftMenuWrapper v-model:openFlag="isOpen"></LeftMenuWrapper>
    <div
      dir="ltr"
      class="relative flex flex-col items-center w-full md:w-[calc(100vw-14rem)] xl:w-[calc(100vw-16rem)] h-screen overflow-hidden right-body">
      <div class="h-full w-full rounded-[inherit] flex flex-col flex-auto">
        <div
          class="flex flex-col justify-center items-center relative top-0 bg-white z-10 md:z-0">
          <div
            class="md:hidden absolute left-0 ml-4 i-flat-color-icons-menu w-6 h-6"
            @click="
              () => {
                isOpen = true;
              }
            "></div>
          <div class="flex items-center justify-center py-3 px-4">
            <NuxtImg src="icons/favicon.ico" class="w-10 h-10 mr-4"></NuxtImg>
            <div class="text-lg font-semibold">Share Cosplay</div>
          </div>
          <!-- <UButton
            class="md:hidden absolute right-0 mr-4"
            color="black"
            variant="solid"
            @click="toLogin">
            登陆
          </UButton> -->
          <UDivider />
        </div>

        <div class="w-full px-8 overflow-auto flex-auto">
          <slot />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import LeftMenuWrapper from "~/components/LeftMenuWrapper.vue";
import { toLogin } from "~/hooks/toLogin";
let isOpen = ref(false);
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
