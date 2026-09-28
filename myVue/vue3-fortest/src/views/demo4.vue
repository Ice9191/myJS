<script setup lang="ts">
import emitter from '../utils/mitt'
import { onMounted, onBeforeUnmount } from 'vue'
import type { Events } from '../utils/mitt'

// 抽成具名函数，on 和 off 必须是同一个引用才能真正移除
const handelUser = (user: Events['event']) => {
    console.log("onMounted 收到 event:", user)
}

onMounted(() => {
    emitter.on("event", handelUser)
    console.log("demo4 已注册 event 监听器")
})
onBeforeUnmount(() => {
    emitter.off("event", handelUser) // off 不会执行回调，仅移除；打印要写在外面
    console.log("onBeforeUnmount：已移除 event 监听器")
})
</script>

<template>
    <div>demo4</div>
</template>