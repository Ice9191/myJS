<script setup lang="ts">
// 圆和正方形的联合类型
// 联合类型表示一个值可以是几种类型中的任意一种。它强调“选择”。
interface Circle {
    kind: 'circle'
    radius: number
}
interface Square {
    kind: 'square'
    sideLength: number
}
// 圆和正方形的联合类型
type Shape = Circle | Square

const area = (shape: Shape) => {
    if (shape.kind === 'circle') {
        return Math.PI * shape.radius * shape.radius    // TS 知道这里一定是 Circle
    }
    return shape.sideLength * shape.sideLength  // TS 知道这里一定是 Square
}

// 应用场景：处理多种输入（函数参数可能是字符串或数字）；状态枚举（加载中 / 成功 / 失败）

console.log('-------------------------------------------')

// 交叉类型表示一个值必须同时拥有多种类型的全部属性。它强调“合并”。
interface Person {
    name: string
    age: number
}
interface Employee {
    employeeId: number
    department: string
}
// 交叉类型
type Staff = Person & Employee

const staff: Staff = {
    name: '张三',
    age: 30,
    employeeId: 1001,
    department: '研发部'
}

// 应用场景：API 数据合并（比如把用户信息和权限信息合并成一个对象）；
</script>

<template>
    <div>ts中的联合类型和交叉类型</div>
</template>