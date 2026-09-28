<script setup lang="ts">
import emitter from '../utils/mitt'
import { ref, watch } from 'vue'

const user = ref({ name: "张三", age: 19 })

// 深层监听
watch(() => user.value.age, (newVal) => {
    emitter.emit("event", newVal)
})

// 简单监听
// watch(user, (newVal) => {
//     emitter.emit("event", newVal)
// })

const handelUser = () => {
    user.value = { name: "李四", age: 20 }
}
</script>

<template>
    <div>兄弟组件之间传值</div>
    <p>当前user名字：{{ user.name }}</p>
    <p>当前user年龄：{{ user.age }}</p>
    <p>当前user：{{ user }}</p>
    <div>修改user名字：<input type="text" v-model="user.name"></div>
    <div>修改user年龄：<input type="number" v-model="user.age"></div>
    <button @click="handelUser">修改user</button>
</template>