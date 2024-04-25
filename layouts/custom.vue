<template>
    <div class="app-layout">
        <header class="app-header">THIS IS HEADER</header>
        <div class="main-wrapper">
            <div class="left-page">
                left ads
            </div>
            <div class="main-body">
                <slot />

            </div>
            <div class="right-page">
                right ads
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title:"cosplay micromatrix",
    layout: "custom",
})

</script>
<style scoped lang='scss'>


.app-layout {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
}

.main-wrapper {
    display: flex;
    flex:1 1 auto;
}

.main-body{
    flex: 1 1 auto;
}
</style>