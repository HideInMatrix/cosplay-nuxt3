<template>
  <div class="images">{{ data }}</div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/test");
</script>
<style scoped lang="scss"></style>
