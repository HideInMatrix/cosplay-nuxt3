<template>
  <div class="app-wrapper">
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const layout = "custom";
</script>

<style lang="scss">
@import url("~/public/css/base.css");
</style>

<style lang="scss" scoped>
.app-wrapper {
  height: 100vh;
  width: 100vw;
}
</style>
