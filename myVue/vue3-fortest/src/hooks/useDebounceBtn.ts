import { ref } from 'vue'

export const useDebounceBtn = () => {

    const count = ref(0)
    let timer: ReturnType<typeof setTimeout> | null = null

    // 防抖：快速连点会不断重置计时，只有停下 500ms 后才真正提交一次
    function onSubmit() {
        if (timer) clearTimeout(timer)
        timer = setTimeout(async () => {
            count.value++
            // await loginApi(form)  ← 真实登录请求
        }, 500)
    }

    return {
        count,
        onSubmit
    }
}