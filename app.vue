<template>
  <div
    class="app-wrapper relative flex flex-col items-center w-full h-screen overflow-hidden">
    <NuxtLayout>
      <NuxtPage keepalive />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// definePageMeta({
//   key: (route) => route.fullPath,
//   transition: {
//     name: "page",
//   },
// });
</script>

<style lang="scss">
@import url("~/public/css/base.css");
</style>

<style lang="scss" scoped>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
