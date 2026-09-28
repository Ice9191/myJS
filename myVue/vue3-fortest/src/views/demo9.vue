<script setup lang="ts">
import type { GetEmployeeListParamsType } from '@/types/types'
import axios from 'axios'
import { onMounted, onActivated, onDeactivated } from 'vue'
import { useLoginStore } from '@/stores/login'
import { useRoute } from 'vue-router'

const route = useRoute()
const loginStore = useLoginStore()

const axiosInstance = axios.create({
    baseURL: '/api',
})

// 获取员工列表
const getEmployeeList = async (params?: GetEmployeeListParamsType) => {
    const token = localStorage.getItem('token')
    // 发送请求，需要解决跨域问题，不然就报错，并且拿不到后端返回的数据
    const ret = await axiosInstance.get<any>('/employee/list', {
        params,
        headers: { Authorization: `Bearer ${token}` }
    })
    console.log(ret.data)
}

// 组件激活时调用
onActivated(() => {
    console.log('组件激活时调用')
})

// 组件失活时调用
onDeactivated(() => {
    console.log('组件失活时调用')
    loginStore.msg = '组件失活了'
})

onMounted(() => {
    console.log('组件挂载时调用')
    getEmployeeList({ page: 1, pageSize: 99 })
})
</script>

<template>
    <div>demo9</div>
    <div>
        <input v-model="loginStore.msg" placeholder="输入点什么，刷新页面看看还在不在" />
        <p>store.msg = {{ loginStore.msg }}</p>
        <div><button @click="loginStore.msg = 'hello pinia'">修改msg</button></div>
        <div><button @click="route.meta.keepAlive = false">踢出缓存队列</button></div>
        <div><button @click="route.meta.keepAlive = true">加入缓存队列</button></div>
    </div>
</template>