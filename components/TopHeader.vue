<template>
  <UHorizontalNavigation
    :links="links"
    class="border-b border-gray-200 justify-center" />
</template>

<script setup lang="ts">
const route = useRoute();

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
