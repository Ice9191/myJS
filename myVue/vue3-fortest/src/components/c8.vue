<script setup lang="ts">
import { ref, type Ref } from 'vue'

interface DefineExposeType {
    // 使 count 被父组件访问时，能够实时更新
    count: Ref<number>
    childMethod: () => void
}

const count = ref(0)

const childMethod = () => {
    console.log('子组件的函数childMethod被调用了')
}

// 使用 defineExpose 暴露 count 和 childMethod
defineExpose<DefineExposeType>({
    count,
    childMethod
})
</script>

<template>
    <div>c8</div>
    <div><input v-model="count" type="number" placeholder="改变count值" /></div>
</template>