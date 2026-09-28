<script setup lang="ts">
// nextTick 的作用是：等 Vue 把数据变化引起的 DOM 更新完成后再执行回调。
import { ref, nextTick } from 'vue'

const count = ref(0)
async function add() {
    count.value++
    // // ❌ 此时 DOM 还没更新，读到的可能是旧值
    // console.log(document.querySelector('#num')?.textContent)

    // await nextTick()
    // // ✅ 这里 DOM 已经更新完成
    // console.log(document.querySelector('#num')?.textContent)
    nextTick(() => {
        console.log(document.querySelector('#num')?.textContent)
    })
}

const show = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
async function showInput() {
    show.value = true
    await nextTick()          // 等 v-if 渲染出 <input>
    inputRef.value?.focus()   // 现在能拿到真实 DOM 并聚焦
}

interface Msg { id: number; text: string }
const messages = ref<Msg[]>([])
const text = ref('')
const box = ref<HTMLDivElement | null>(null)
let id = 0
async function send() {
    if (!text.value.trim()) return
    messages.value.push({ id: ++id, text: text.value })
    console.log(messages.value)
    text.value = ''
    await nextTick()                       // 等新消息渲染进 DOM
    if (box.value) box.value.scrollTop = box.value.scrollHeight  // 新消息进入后滚到底
}
</script>

<template>
    <div>
        <div id="num">{{ count }}</div>
        <button @click="add">增加</button>
    </div>
    <br>
    <div style="height: 2px; background-color: black"></div>
    <br>
    <div>
        <button @click="showInput">显示输入框</button>
        <input v-if="show" ref="inputRef" />
    </div>
    <div style="height: 2px; background-color: black"></div>
    <br>
    <!-- 滚动容器：固定高度 + overflow，ref 绑定 -->
    <div ref="box" style="height: 300px; overflow-y: auto; border: 1px solid #eee; padding: 10px">
        <div v-for="m in messages" :key="m.id"
            style="padding: 8px; margin: 6px 0; background: #f5f5f5; border-radius: 6px">
            {{ m.text }}
        </div>
    </div>
    <!-- 输入区 -->
    <div style="margin-top: 10px; display: flex; gap: 8px">
        <input v-model="text" @keyup.enter="send" placeholder="输入消息，回车发送" style="flex: 1; padding: 8px" />
        <button @click="send">发送</button>
    </div>
</template>