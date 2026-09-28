vue3的打包速度为什么比vue2快？
    https://chat.deepseek.com/share/i4r8jzj7gilruax1p5
    
虚拟DOM
    虚拟DOM（Virtual DOM）是一种在内存中构建的DOM树，用js对象来描述dom的层次结构，dom中的一切属性都在虚拟dom中有对应的属性。
    它通过比较虚拟DOM和真实DOM的差异，来减少对真实DOM的操作次数，从而提高性能。

diff算法
    diff算法可以进行精细化比对，实现最小量更新
    diff是发生在虚拟dom上的，新虚拟dom和老虚拟dom进行diff（精细化比较），算出应该如何最小量更新，最后反映到真正的dom上

js栈内存、堆内存、事件循环机制
    https://chat.deepseek.com/share/m4tvoyi5412m9f3xz4

什么是语法糖？
    语法糖是一种更简洁、更易读的语法，它在内部实现上和普通语法没有区别，只是在语法上更方便。
    https://chat.deepseek.com/share/inj5xlfs8wladzadoy
