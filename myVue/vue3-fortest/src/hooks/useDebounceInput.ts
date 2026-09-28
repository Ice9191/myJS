import { ref } from 'vue'

export const useDebounceInput = () => {

    const inputText = ref('')
    const searchResult = ref('')
    const requestCount = ref(0)

    // 简单防抖实现：n 毫秒内再次触发会重新计时，安静 n 毫秒后才执行
    function debounce<T extends (...args: any[]) => void>(fn: T, wait = 500) {
        let timer: ReturnType<typeof setTimeout> | null = null
        return (...args: Parameters<T>) => {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => fn(...args), wait)
        }
    }

    // 模拟「搜索请求」（真实项目里换成 api 调用，比如 getUserListApi(kw)）
    const doSearch = debounce((kw: string) => {
        requestCount.value++
        searchResult.value = `第 ${requestCount.value} 次请求，关键词：${kw || '(空)'}`
    }, 500)

    function handleInput(e: Event) {
        const val = (e.target as HTMLInputElement).value
        inputText.value = val
        // 每次输入都调用，但只有停下来 500ms 才真正发请求
        doSearch(val)
    }

    return {
        inputText,
        searchResult,
        requestCount,
        handleInput
    }
}