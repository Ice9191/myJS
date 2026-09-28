<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<template>
  <!-- 路由缓存 -->
  <div>App.vue头部</div>
  <!-- 全部路由都缓存 -->
  <!-- 加上v-slot后，路由组件会作为子组件渲染，不会被缓存起来 -->
  <!-- { Component } 是解构赋值。<router-view> 内部把当前匹配到的路由组件存放在一个名叫 Component 的变量里
    ，并通过插槽绑定暴露了出来。我们用 v-slot 把它接住，这样你才能在自己的模板里用 <component :is="Component" />
     去动态渲染它 -->
  <!-- :is="Component"：就是告诉 <component>：“请把变量 Component 所代表的那个组件，给我实例化并渲染出来。” -->
  <!-- 刷新页面会清除缓存 -->
  <!-- <RouterView v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component" />
    </KeepAlive>
  </RouterView> -->

  <!-- 按需缓存 （被缓存的组件不会经历标准的创建(created)和销毁(beforeDestroy/destroyed)过程，而是获得两个独有的生命周期钩子：activated和deactivated）-->
  <RouterView v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component" v-if="route.meta.keepAlive" />
    </KeepAlive>
    <component :is="Component" v-if="!route.meta.keepAlive" />
  </RouterView>
</template>