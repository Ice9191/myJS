<script setup lang="ts">
import { useDebounceInput } from '../hooks/useDebounceInput'
import { useDebounceResize } from '../hooks/useDebounceResize'
import { useDebounceBtn } from '@/hooks/useDebounceBtn';

const { inputText, searchResult, requestCount, handleInput } = useDebounceInput()
const { width, resizeCount } = useDebounceResize()
const { count, onSubmit } = useDebounceBtn()
</script>

<template>
    <div>防抖节流的使用</div>
    <div>防抖 (Debounce)：在事件被触发后，等待 n 秒再执行回调。如果在这 n 秒内事件被再次触发，则重新计时。适用场景：搜索框输入、窗口 resize 调整、登录/提交按钮防连点。</div>
    <div>节流 (Throttle)：如果持续触发某个事件，则保证在每隔 n 秒的时间间隔内只执行一次回调。适用场景：滚动加载更多、用户交互与高频点击、窗口与容器尺寸调整。</div>
    <div style="padding: 20px">
        <div>防抖在搜索框输入中的应用</div>
        <input :value="inputText" @input="handleInput" placeholder="连续输入，停下来 500ms 才发请求"
            style="padding: 6px; width: 320px" />
        <p>已发起搜索请求次数：{{ requestCount }}</p>
        <p>搜索结果：{{ searchResult || '——' }}</p>
    </div>
    <div style="height: 2px; background-color: black"></div>
    <div style="padding: 20px">
        <div>防抖在 window resize 中的应用</div>
        <p>当前窗口宽度：{{ width }} px</p>
        <p>resize 实际执行次数：{{ resizeCount }}</p>
        <p>拖动窗口，停下来 300ms 才更新一次</p>
    </div>
    <div style="height: 2px; background-color: black"></div>
    <div style="padding: 20px">
        <h3>防抖防连点</h3>
        <button @click="onSubmit">登录</button>
        <p>实际提交次数：{{ count }}</p>
        <p>狂点按钮，只会提交 1 次（但首次点击延迟 500ms）</p>
    </div>
</template>