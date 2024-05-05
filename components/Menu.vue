<template>
  <div class="space-y-8 p-6">
    <a
      :href="item.to"
      class="flex w-full justify-start items-center"
      v-for="item in links">
      <Icon size="24" :name="item.icon" />
      <h2 class="px-4 text-lg font-semibold tracking-tight">
        {{ item.label }}
      </h2>
    </a>
  </div>
</template>

<script setup lang="ts">
const links = [
  // {
  //   label: "Home",
  //   icon: "i-flat-color-icons-home",
  //   to: "/",
  // },
  {
    label: "Cosplay",
    icon: "i-flat-color-icons-camera",
    to: "/cosplay/",
  },
  {
    label: "Cosers",
    icon: "i-flat-color-icons-businesswoman",
    to: `/cosers`,
  },
];
</script>
<style scoped lang="scss"></style>
