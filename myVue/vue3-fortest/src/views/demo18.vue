<script setup lang="ts">
import c9 from '../components/c9.vue'
import { ref } from 'vue'

const loading = ref(false)

const submitData = () => {
    loading.value = true
}
</script>

<template>
    <c9 type="primary" :loading="loading" @click="submitData">点击我</c9>
</template>