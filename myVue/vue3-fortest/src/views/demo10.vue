<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
// import c7 from '../components/c7.vue'

// 定义一个异步组件，只有在这个组件被渲染时，才会加载其代码，只有在点击按钮后，才会加载其代码，此时可以在控制台的network中看到一个请求
const asyncHeavyComponent = defineAsyncComponent(() => import('../components/c7.vue'))

const showAsyncHeavyComponent = ref(false)
</script>

<template>
    <div>组件懒加载：父组件</div>
    <!-- 点击按钮后，才会加载异步组件，此时可以在控制台的network中看到一个c7.vue的请求 -->
    <button @click="showAsyncHeavyComponent = true">显示异步组件</button>
    <div v-if="showAsyncHeavyComponent">
        <!-- 组件懒加载的是子组件，而不是父组件 -->
        <asyncHeavyComponent />
        <!-- <c7 /> -->
    </div>
</template>