import {ref, onMounted, onUnmounted} from 'vue'

export function useMouseMove(){
    let x = ref(0)
    let y = ref(0)
    const handleMouseMove = (e:MouseEvent)=>{
        x.value = e.pageX
        y.value = e.pageY
    }
    onMounted(()=>{
        window.addEventListener('mousemove', handleMouseMove)
    })
    onUnmounted(()=>{
        window.removeEventListener('mousemove', handleMouseMove)
    })
    return {x, y}
}