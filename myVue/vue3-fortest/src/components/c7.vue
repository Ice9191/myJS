<script setup lang="ts">
// 模拟一个开销较大的初始化
console.log('HeavyChart 组件已加载并初始化')
</script>

<template>
    <div>子组件c7</div>
    <div v-for="i in 99999" :key="i">数据项 {{ i }}</div>
</template>