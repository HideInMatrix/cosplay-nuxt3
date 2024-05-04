<template>
  <UVerticalNavigation
    :links="links"
    :ui="{
      active: '',
      base: 'flex w-full justify-start items-center',
      wrapper: 'menu-wrapper',
    }"
    class="p-6 menu-wrapper">
    <template #default="{ link }">
      <h2 class="px-4 text-lg font-semibold tracking-tight">
        {{ link.label }}
      </h2>
    </template>
  </UVerticalNavigation>
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
<style scoped lang="scss">
.space-y-8 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
}

ul {
  display: grid;
  gap: 10px;
}
</style>
