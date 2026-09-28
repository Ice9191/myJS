<script setup lang="ts">
import c1 from '../components/c1.vue'
import c2 from '../components/c2.vue'
import c3 from '../components/c3.vue'
import { ref } from 'vue'

export interface ParentProps {
    msg: string
}

let msg = ref('hello vue3')
const handleSendMsg = (msg: string) => {
    console.log("子组件发送的消息:", msg)
}
const c2msg = ref("c2")
const handleUpdataModelValue = (val: string) => {
    console.log("子组件修改了父组件的消息:", val)
    c2msg.value = val
}

const c3msg = ref("123")
const c3msg2 = ref("abc")

const handleSuccess = () => {
    console.log("c3子组件的msg成功被修改了")
}
</script>

<template>
    <div>父传子，子传父</div>
    <input type="text" v-model="msg">
    <c1 :msg="msg" @sendMsg="handleSendMsg" />
    <div>子组件无法修改父组件的消息</div>
    <div>---------------------------------------</div>
    <input type="text" v-model="c2msg">
    <div>父组件：{{ c2msg }}</div>
    <!-- <c2 :c2msg="c2msg" @updata:c2msg="handleUpdataModelValue" /> -->
    <c2 v-model="c2msg" @updata:model-value="handleUpdataModelValue" />
    <div>子组件可以修改父组件的消息</div>
    <div>---------------------------------------</div>
    <c3 v-model:c3msg="c3msg" v-model:c3msg2="c3msg2" @success="handleSuccess"></c3>
    <p>{{ c3msg }}</p>
    <p>{{ c3msg2 }}</p>
    <div>子组件可以修改父组件的消息</div>
</template>