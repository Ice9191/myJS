// 二次封装 axios
import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
    // 这是 Vite 项目的环境变量。import.meta.env 是 Vite 提供的访问环境变量的方式，VITE_BASE_URL 是一个自定义变量，通常在 .env 文件中定义。
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        // 携带token，处理请求头
        return config
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        // 统一解构响应数据，提取出 {code, data, msg} 字段，判断code是否为200，是则返回data
        return response
    },
    (error) => {
        // 对响应错误做点什么
        // 错误码统一映射：如 401 自动清除Token并跳转登录页；403 弹窗提示无权限；500 统一Message提示。
        const { response } = error
        if (response) {
            const { code, msg } = response.data
            if (code === 401) {
                // 自动清除Token并跳转登录页
                // 清除Token
                // 跳转登录页
            } else if (code === 403) {
                // 弹窗提示无权限
            } else if (code === 500) {
                // 统一Message提示
            }
        }
        return Promise.reject(error)
    }
)