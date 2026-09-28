<script setup lang="ts">
import { watch } from 'vue'

const msg = defineModel<string>("c3msg")
const msg2 = defineModel<string>("c3msg2")

const emit = defineEmits<{
    (e: "success"): void
}>()
</script>

<template>
    <p>c3:{{ msg }}</p>
    <p>c3:{{ msg2 }}</p>
    <div>c3:<input type="text" v-model="msg"></input></div>
    <div>c32:<input type="text" v-model="msg2"></input></div>
    <button @click="watch(() => msg, (val) => {
        if (val) {
            emit('success')
        }
    })">修改成功</button>
</template>