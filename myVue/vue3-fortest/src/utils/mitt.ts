import mitt from 'mitt'

// 只能使用type定义事件类型
export type Events = {
    event: { name: string, age: number } | number
   }

const emitter = mitt<Events>()

export default emitter