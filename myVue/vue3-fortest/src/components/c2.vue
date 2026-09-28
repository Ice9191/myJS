<script setup lang="ts">
import { computed } from 'vue'

// const props = defineProps<{ c2msg: string }>()
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{
    // (e: "updata:c2msg", val: string): void
    (e: "updata:model-value", val: string): void
}>()

const msg = computed({
    get() {
        return props.modelValue
    },
    set(val: any) {
        emit("updata:model-value", val)
    }
})
</script>

<template>
    <p>c2:{{ msg }}</p>
    <div>c2：<input type="text" v-model="msg"></div>
</template>