<template>
  <USlideover
    v-model="isOpen"
    side="left"
    :ui="{
      wrapper: 'fixed z-50 gap-4  w-64 p-0',
    }">
    <MenuWrapper></MenuWrapper>
  </USlideover>
  <MenuWrapper class="hidden md:block"></MenuWrapper>
</template>

<script setup lang="ts">
import MenuWrapper from "./MenuWrapper.vue";
const props = defineProps({
  openFlag: {
    type: Boolean,
    default: false,
  },
});
let emits = defineEmits(["update:openFlag"]);
let isOpen = computed({
  get: () => props.openFlag,
  set: (val) => emits("update:openFlag", val),
});
</script>
<style scoped lang="scss"></style>
