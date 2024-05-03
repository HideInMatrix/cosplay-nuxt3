<template>
  <div class="app-wrapper">
    <NuxtLayout>
      <NuxtPage keepalive />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
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
.app-wrapper {
  height: 100vh;
  width: 100vw;
}
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
