<script setup lang="ts">
import c6 from '../components/c6.vue'

</script>

<template>
    <div>插槽</div>
    <c6>
        <!-- 匿名插槽 -->
        <!-- <div style="color: red;">父组件插入的内容1</div>
        <div style="color: green;">父组件插入的内容2</div> -->
        <!-- 具名插槽 -->
        <!-- v-slot可以缩写为# -->
        <template #default>
            <div style="color: red;">父组件插入的内容1</div>
        </template>
        <template #header>
            <div style="color: green;">父组件插入的内容2</div>
        </template>
        <!-- 作用域插槽 核心区别在于：数据在子组件中，但渲染逻辑由父组件控制 -->
        <template #main="{ data, id }">
            <div style="color: blue;">{{ data.name }}和{{ id }}</div>
        </template>
    </c6>
</template>