import { ref, onMounted, onUnmounted } from 'vue'

export const useDebounceResize = () => {

    const width = ref(window.innerWidth)
    const resizeCount = ref(0)

    // 简单防抖实现：n 毫秒内再次触发会重新计时，安静 n 毫秒后才执行（用于窗口 resize 调整）
    function debounce<T extends (...args: any[]) => void>(fn: T, wait = 300) {
        let timer: ReturnType<typeof setTimeout> | null = null
        const debounced = (...args: Parameters<T>) => {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => fn(...args), wait)
        }
        debounced.cancel = () => { if (timer) { clearTimeout(timer); timer = null } }
        return debounced
    }

    // 窗口停止变化 300ms 后才真正读取宽度（resize 事件本身不带有用参数，直接读 window）
    const onResize = debounce(() => {
        width.value = window.innerWidth
        resizeCount.value++
    }, 300)

    // 关键 1：挂载时手动绑定 window 事件
    onMounted(() => {
        window.addEventListener('resize', onResize)
    })

    // 关键 2：卸载时移除监听 + 取消定时器，避免内存泄漏
    onUnmounted(() => {
        window.removeEventListener('resize', onResize)
        onResize.cancel()
    })

    return {
        width,
        resizeCount
    }
}