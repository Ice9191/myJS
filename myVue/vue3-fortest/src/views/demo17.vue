<script setup lang="ts">
/**
 * vue中的表单和事件修饰符
 * 事件修饰符用于处理 v-on 指令（或 @ 简写）绑定的事件，有.stop .prevent .capture .self .once .passive .native
 * 表单修饰符与 v-model 指令配合使用，用于控制数据更新的时机或格式，有.lazy .trim .number
 */
function handleParentClick() {
    console.log('父元素点击了')
}
function handleChildClick() {
    console.log('子元素点击了')
}
</script>

<template>
    <div>.stop 阻止事件冒泡（由内向外）</div>
    <div class="fu" @click="handleParentClick">
        父元素
        <!-- 给子元素 .stop 修饰符，阻止子元素点击冒泡到父元素 -->
        <div class="zi" @click.stop="handleChildClick">
            子元素
        </div>
    </div>
</template>

<style scoped>
.fu {
    width: 500px;
    height: 500px;
    border: 2px solid red;
}

.zi {
    width: 200px;
    height: 200px;
    border: 2px solid blue;
}
</style>