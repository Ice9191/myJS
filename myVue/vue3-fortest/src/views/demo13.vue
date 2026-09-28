<script setup lang="ts">
import c8 from '@/components/c8.vue'
import { ref } from 'vue'

const childRef = ref<InstanceType<typeof c8>>()

const fn = () => {
    console.log(childRef.value?.count)
    childRef.value?.childMethod()
}
</script>

<template>
    <!-- 在使用<script setup></script>时，组件默认是封闭的。这意味着父组件无法通过模板引用（template ref）直接访问子组件内部定义的任何变量或函数。
    为了在保持组件封装性的同时，又能提供必要的公共接口，就需要使用 defineExpose 来明确指定哪些内容可以被外部访问。 -->
    <div>defineExpose的使用</div>
    <!-- 通过 ref 访问子组件的 count 和 childMethod -->
    <c8 ref="childRef" />
    <button @click="fn">调用子组件的函数</button>
</template>