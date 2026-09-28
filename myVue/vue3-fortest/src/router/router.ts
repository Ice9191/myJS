import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { UserInfoResponseType } from '../types/types.ts'
import { useLoginStore } from '../stores/login.ts'
import demo3 from '../views/demo3.vue'

// 映射后端返回的路由到组件加载器
const modules = import.meta.glob('@/views/**/*.vue')

// 定义404页面
const fallbackLoader = () => import('@/views/404.vue');

const generateRoutesFromBackend = (backendRoutes: UserInfoResponseType['menus']): RouteRecordRaw[] => {
  return backendRoutes.map(item => {
    // 根据后端返回的 component 路径，从 modules 中找到对应的加载器
    let componentLoader = modules[`/src/views/${item.component}.vue`]
    if (!componentLoader) {
      // 如果组件加载器不存在，打印警告信息
      console.warn(`Component not found: /src/views/${item.component}.vue`);
      componentLoader = fallbackLoader
    }
    // 创建动态路由配置
    const routeRecord: RouteRecordRaw = {
      path: item.path,
      component: componentLoader,
      // 给动态路由的meta添加title属性，只需在后端返回的菜单数据中包含 meta.title 即可，并在前端生成路由时原样传递给 RouteRecordRaw 的 meta 字段即可
      meta: item.meta,
      ...(item.children && item.children.length > 0 ? { children: [] } : {})
    }
    // 递归处理子路由
    if (item.children && item.children.length > 0) {
      routeRecord.children = generateRoutesFromBackend(item.children)
    }
    return routeRecord
  })
}

// 静态路由配置
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/demo1',
    // 路由懒加载：按需加载组件，只有在访问该路由时才会加载组件，极大缩短首屏加载时间和白屏时间，优化首屏加载性能，同时也是首页白屏问题的解决方案
    component: () => import('../views/demo1.vue'),
  },
  {
    path: '/demo2',
    component: () => import('../views/demo2.vue'),
  },
  {
    path: '/demo3',
    // 无路由懒加载，直接import的话，会在控制台的network中显示一个请求，会占用首屏加载时间
    component: demo3,
  },
  {
    path: '/demo4',
    component: () => import('../views/demo4.vue'),
  },
  {
    path: '/demo5',
    component: () => import('../views/demo5.vue'),
  },
  {
    path: '/demo6',
    component: () => import('../views/demo6.vue'),
  },
  {
    path: '/demo7',
    component: () => import('../views/demo7.vue'),
    meta: { keepAlive: true }
  },
  {
    path: '/demo8',
    component: () => import('../views/demo8.vue')
  },
  {
    path: '/demo10',
    component: () => import('../views/demo10.vue')
  },
  {
    path: '/demo11',
    component: () => import('../views/demo11.vue')
  },
  {
    path: '/demo12',
    component: () => import('../views/demo12.vue')
  },
  {
    path: '/demo13',
    component: () => import('../views/demo13.vue')
  },
  {
    path: '/demo14',
    component: () => import('../views/demo14.vue')
  },
  {
    path: '/demo15',
    component: () => import('../views/demo15.vue'),
    beforeEnter: ()=>{
      const token = localStorage.getItem('token')
      if(token){
        console.log('token存在')
        return true
      }else{
        console.warn('token不存在')
        return '/login'
      }
    }
  },
  {
    path: '/demo16',
    component: () => import('../views/demo16.vue')
  },
  {
    path: '/demo17',
    component: () => import('../views/demo17.vue')
  },
  {
    path: '/demo18',
    component: () => import('../views/demo18.vue')
  },
  // 设置动态路由的原因：保证有可访问的菜单权限时，才会渲染对应的菜单页面
  // {
  //   path: '/demo9',
  //   component: () => import('../views/demo9.vue')
  // },
  // {
  //   path: '/dept/user',
  //   component: () => import('../views/dept/user.vue')
  // },
  // {
  //   path: '/dept/role',
  //   component: () => import('../views/dept/role.vue')
  // },
  {
    path: '/login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/',
    // 重定向到/demo9
    redirect: '/demo9'
  },
  {
    // 只要访问任意未匹配的路由就会触发404页面
    path: '/:pathMatch(.*)*',
    component: fallbackLoader
  },
]

const router = createRouter({
  // hash模式和history模式的区别：hash模式在url中会显示#，history模式不会显示，history模式需要配置路由重定向
  // https://chat.deepseek.com/share/y88yxrt1x2hl2puk3g
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

// 全局前置路由守卫
router.beforeEach((to) => {
  // 这里对token做了持久化处理，是手动进行持久化，使用的是localStorage
  const token = localStorage.getItem('token')
  const loginStore = useLoginStore()
  if (token) {
    if (loginStore.ifLogin) {
      return true
    } else {
      loginStore.ifLogin = true
      // 添加动态路由
      // 动态路由配置
      const dynamicRoutes = generateRoutesFromBackend(mockUserInfo.menus)
      dynamicRoutes.forEach(route => {
        router.addRoute(route)
      })
      // 重新触发路由守卫，此时再匹配一次路由，to.matched会匹配到/demo9路由
      return { ...to, replace: true }
      // 不能直接return true的原因：在beforeEach运行前，此时还没有addRoute进去，to.matched没有匹配到/demo9，就直接跳到404页面
      // return true
    }
  } else {
    // 无token，判断是否是登录页，是则放行，否则跳转登录页
    if (to.path === '/login') {
      return true
    } else {
      return '/login'
    }
  }
})

// 全局后置路由守卫
// to 和 from 代表了标准化后的路由位置对象，包含了当前路由的完整信息。你可以通过它们访问诸如 path、params、query、hash、fullPath、name、meta 等属性。
router.afterEach((to, from) => {
  // 示例1：每次路由切换后，更新页面标题
  document.title = to.meta.title || 'Vue3 Router 示例'
  // 示例2：每次路由切换后滚动到顶部
  window.scrollTo(0, 0)
  // 示例3：打印导航日志（可做埋点/统计）
  console.log(`[路由后置] 从 ${from.path} 跳转到 ${to.path}`)
})

export default router

export const mockUserInfo: UserInfoResponseType = {
  id: 1,
  username: 'admin',
  real_name: '超级管理员',
  menus: [
    {
      path: '/demo9',
      component: 'Layout',
      menu_name: 'Demo9',
      meta: { title: 'Demo9' },
      // 单个空路径子路由：仍是 Layout 的子路由（页面在 Layout 内），但菜单上不显示下拉
      children: [
        { path: '', component: 'demo9', menu_name: 'Demo9 页面', meta: { title: 'Demo9 页面', keepAlive: true } }
      ]
    },
    {
      path: '/dept',
      component: 'Layout',
      menu_name: '部门管理',
      meta: { title: '部门管理' },
      children: [
        { path: 'user', component: 'dept/user', menu_name: '用户管理', meta: { title: '用户管理', keepAlive: true } },
        { path: 'role', component: 'dept/role', menu_name: '角色管理', meta: { title: '角色管理', keepAlive: true } }
      ]
    }
  ],
  menupermissions: [
    'demo9',
    'dept',
    'dept:user',
    'dept:role'
  ],
  btnpermissions: [
    'dept:user:add',
    'dept:user:delete'
  ]
}

// 测试用户：没有 "用户管理(user)" 页面权限
export const mockTestUser: UserInfoResponseType = {
  id: 2,
  username: 'test',
  real_name: '测试用户',
  menus: [
    {
      path: '/demo9',
      component: 'Layout',
      menu_name: 'Demo9',
      children: [
        { path: '', component: 'demo9', menu_name: 'Demo9 页面' }
      ]
    },
    {
      path: '/dept',
      component: 'Layout',
      menu_name: '部门管理',
      // 只保留 "角色管理"，没有 "用户管理"
      children: [
        { path: 'role', component: 'dept/role', menu_name: '角色管理' }
      ]
    }
  ],
  menupermissions: [
    'demo9',
    'dept',
    'dept:role'
  ],
  btnpermissions: []
}