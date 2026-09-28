<script setup lang="ts">
import c4 from '../components/c4.vue'
import { ref, provide, inject } from 'vue'

export interface User {
    user: {
        name: string,
        age: number
    },
    changeName: () => void
}

const user = ref({
    name: '张三',
    age: 18,
})

const changeName = () => {
    user.value.name = '李四'
}

provide<User>("user", {
    user: user.value,
    changeName
})

// const goods = inject<Goods>("goods")
</script>

<template>
    <div>vue3后代传值</div>
    <!-- <div>商品名称:{{ goods?.name }}</div>
    <div>商品价格:{{ goods?.price }}</div> -->
    <div>---------------------------------------</div>
    <c4></c4>
</template>