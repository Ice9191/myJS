import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore('login', () => {
    const ifLogin = ref<boolean>(false)
    const msg = ref<string>('')

    return {
        ifLogin,
        msg
    }
}, {
    // 开启store数据持久化；pick 指定只持久化 msg 字段（存到 localStorage 的 'login' 键下，在localStorage中能看到），刷新页面后，msg字段会保留
    persist: {
        pick: ['msg']
    }
    // 开启store全部数据持久化；默认开启
    // persist: true
})