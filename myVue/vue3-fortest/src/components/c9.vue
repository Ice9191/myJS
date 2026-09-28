<script setup lang="ts">
interface Props {
    size?: 'small' | 'medium' | 'large'
    type?: 'primary' | 'default'
    loading?: boolean
    disabled?: boolean
}

// withDefaults 函数用于为 props 定义默认值，当组件没有提供 props 时，会使用默认值而不是报错
const props = withDefaults(defineProps<Props>(), {
    size: 'medium',
    type: 'default',
    loading: false,
    disabled: false
})

interface Emits {
    (e: 'click'): void
}

// 定义事件
const emit = defineEmits<Emits>()

const handleClick = () => {
    if (props.loading || props.disabled) return
    emit('click')
}
</script>

<template>
    <div>组件封装</div>
    <button :class="['btn', `btn-${type}`, `btn-${size}`]" @click="handleClick" :disabled="loading || disabled">
        <slot>{{ loading ? '加载中...' : '' }}</slot>
    </button>
</template>