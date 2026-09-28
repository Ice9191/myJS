<script setup lang="ts">
import type { ParentProps } from '../views/demo1.vue'
import { watch, ref } from 'vue'

export interface ChildEmits {
    (e: 'sendMsg', msg: string): void
}

let props = defineProps<ParentProps>()
watch(() => props.msg, (val) => {
    console.log("子组件收到父组件传递的消息:", val)
})

let msg = ref('这是子组件的消息:')

const emit = defineEmits<ChildEmits>()
</script>

<template>
    <div>组件1</div>
    {{ props.msg }}
    <button @click="emit('sendMsg', msg)">发送消息</button>
</template>