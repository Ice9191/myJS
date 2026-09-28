<script setup lang="ts">
import { inject, ref, provide } from 'vue'
import type { User } from '../views/demo2.vue'

export interface Goods {
    name: string,
    price: number
}

const user = inject<User>("user")

// provide无法自下而上传值
// const goods = ref({
//     name: '商品1',
//     price: 1300
// })

// provide("goods", {
//     goods
// })
</script>

<template>
    <div>组件5</div>
    <div>名字:{{ user?.user.name }}</div>
    <button @click="user?.changeName">修改名字</button>
</template>