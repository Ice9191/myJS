import 'vue-router'
import type { RouteMeta } from 'vue-router'

// 扩展路由元信息，用于权限控制
declare module 'vue-router' {
    interface RouteMeta {
        keepAlive?: boolean
        title?: string
    }
}

export interface UserInfoResponseType {
    id: number
    username: string
    real_name: string
    menus: {
        path: string
        component: string
        menu_name: string
        meta?: RouteMeta
        children?: UserInfoResponseType['menus']
    }[]
    menupermissions: string[]
    btnpermissions: string[]
}

export interface GetEmployeeListParamsType {
    page: number
    pageSize: number
}