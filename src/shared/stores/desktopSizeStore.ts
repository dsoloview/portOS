import { defineStore } from 'pinia'
import { ref } from 'vue'

const useDesktopSizeStore = defineStore('desktopSize', () => {
  const height = ref<number>(0)
  const width = ref<number>(0)

  const setDesktopSize = (newHeight: number, newWidth: number) => {
    height.value = newHeight
    width.value = newWidth
  }

  return {
    height,
    width,
    setDesktopSize
  }
})

export default useDesktopSizeStore
