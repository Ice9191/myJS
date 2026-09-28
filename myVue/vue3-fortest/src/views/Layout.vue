<script setup lang="ts">
import { mockUserInfo } from '@/router/router'

// 侧边栏菜单直接来自后端返回的权限数据（mock）
const menus = mockUserInfo.menus
</script>

<template>
  <el-container class="layout">
    <el-aside width="220px">
      <div class="logo">OA 后台</div>
      <el-menu router background-color="#001529" text-color="#cfcfcf" active-text-color="#fff">
        <template v-for="item in menus" :key="item.path">
          <!-- 单个空路径子路由：直接显示为一项，不显示下拉（页面仍在 Layout 内） -->
          <el-menu-item v-if="item.children && item.children.length === 1"
            :index="item.children?.[0]?.path ? `${item.path}/${item.children[0].path}` : item.path">
            {{ item.children?.[0]?.menu_name }}
          </el-menu-item>

          <!-- 有子菜单：渲染为可展开的下拉 -->
          <el-sub-menu v-else-if="item.children && item.children.length" :index="item.path">
            <template #title>{{ item.menu_name }}</template>
            <el-menu-item v-for="child in item.children" :key="child.path"
              :index="child.path ? `${item.path}/${child.path}` : item.path">
              {{ child.menu_name }}
            </el-menu-item>
          </el-sub-menu>

          <!-- 叶子菜单（无 children）：直接显示为一项 -->
          <el-menu-item v-else :index="item.path">
            {{ item.menu_name }}
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">顶部导航</el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout {
  height: 100vh;
}

.el-aside {
  background: #001529;
}

.logo {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-weight: 600;
  color: #fff;
}

.el-aside .el-menu {
  border-right: none;
}

.header {
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #eee;
}
</style>
