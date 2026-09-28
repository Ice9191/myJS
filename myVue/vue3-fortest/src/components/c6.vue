<script setup lang="ts">
import { ref } from 'vue'

const list = ref([
    { id: 1, name: "张三", text: "张三的插槽内容" },
    { id: 2, name: "李四", text: "李四的插槽内容" },
    { id: 3, name: "王五", text: "王五的插槽内容" }
])
</script>

<template>
    <slot>匿名插槽</slot>
    <div>-----------------------</div>
    <slot name="header">具名插槽</slot>
    <ul>
        <li v-for="item in list" :key="item.id">
            <slot :data="item" :id="item.id" name="main">作用域插槽
                {{ item.text }}
            </slot>
        </li>
    </ul>
</template>