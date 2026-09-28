<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 写死的 token（演示用）
const TOKEN = 'mock-token-abc123'

const username = ref('admin')
const password = ref('123456')

const handleLogin = () => {
  // 写死：不校验账号密码，直接登录（演示用）
  localStorage.setItem('token', TOKEN)
  router.push('/')
}
</script>

<template>
  <div class="login">
    <el-card class="login-card">
      <h2 class="title">登录</h2>
      <el-form label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="handleLogin">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
}

.login-card {
  width: 360px;
}

.title {
  text-align: center;
  margin: 0 0 20px;
}
</style>
