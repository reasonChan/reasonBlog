<template>
  <Suspense>
    <template #default>
      <async-update-item></async-update-item>
    </template>
    <template #fallback>
      <div>loading...这里放骨架屏的组件</div>
    </template>
  </Suspense>
</template>

<script setup>
import {defineAsyncComponent} from "vue";
const asyncUpdateItem = defineAsyncComponent(()=>import('./updateItem.vue'))
</script>

<style scoped>

</style>
