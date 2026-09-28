<script setup lang="ts">
import { h, createApp, onMounted } from 'vue'

// 使用h函数创建虚拟节点
const el = h('div', { class: 'wrapper', id: 'app' }, [
    h('a', { href: 'https://www.baidu.com' }, '点击跳转')
])

console.log(el)

const el2 = h('div', { class: 'wrapper', id: 'app2', }, '你好')

onMounted(() => {
    // render 函数可以返回数组，数组中的每个元素都是一个虚拟节点，数组中的元素会被渲染到容器中
    createApp({
        render: () => [el, el2]
    }).mount('#container')
})
</script>

<template>
    <div id="container" style="width: 500px; height: 500px;background-color: red;"></div>
</template>

<style scoped>
/* :deep() 让 scoped 样式穿透到组件内部、但非本模板直接渲染的元素
   （如 v-html 内容、子组件内部、以及这里另一个 createApp 渲染进来的 div） */
:deep(.wrapper) {
    width: 200px;
    height: 200px;
    margin: 10px;
    border: 2px solid #000;
}
</style>
