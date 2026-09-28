<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onActivated, onDeactivated } from 'vue'

const route = useRoute()

console.log(route.meta.title)

// 组件激活时调用
onActivated(() => {
    console.log('组件激活时调用')
})

// 组件失活时调用
onDeactivated(() => {
    console.log('组件失活时调用')
})
</script>

<template>
    <div>user</div>
    <div>{{ route.meta.title }}</div>
</template>