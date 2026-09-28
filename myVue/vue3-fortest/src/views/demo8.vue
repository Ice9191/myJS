<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const router = useRouter()

const goToDemo6 = () => {
    router.push('/demo6');
}

const num = ref(10)
</script>

<template>
    // 路由缓存 https://chat.deepseek.com/share/7cqo6eez79ylv4d98j
    <p>当前num：{{ num }}</p>
    <div><input type="text" v-model="num"></div>
    <button @click="goToDemo6">跳转</button>
</template>