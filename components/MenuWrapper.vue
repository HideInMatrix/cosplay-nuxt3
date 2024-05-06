<template>
  <div class="relative md:w-56 xl:w-64 h-screen border-r border-r-border">
    <div class="h-16"></div>
    <UDivider />
    <Menu></Menu>
    <div class="absolute p-3 bottom-0 w-full">
      <UButton color="black" variant="solid" block @click="toLogin">
        登陆
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from "~/components/Menu.vue";
import { toLogin } from "~/hooks/toLogin";
</script>
<style scoped lang="scss"></style>
