<template>
  <div
    class="app-wrapper relative flex flex-col items-center w-full h-screen overflow-hidden">
    <NuxtLayout>
      <NuxtPage keepalive />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Share Cosplay",
  meta: [
    {
      hid: "micromatrix",
      name: "写真网站",
      content: "免费的写真网站",
    },
  ],
  key: (route) => route.fullPath,
  transition: {
    name: "page",
  },
  keepalive: {
    exclude: ["cosplay", "cosers", "cosplays/[id]"], // 需要缓存的页面
  },
});
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
