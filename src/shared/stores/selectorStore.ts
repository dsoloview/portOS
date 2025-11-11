import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSelectorStore = defineStore('selector', () => {
  const isSelecting = ref(false)

  const startSelecting = () => {
    isSelecting.value = true
  }

  const stopSelecting = () => {
    isSelecting.value = false
  }

  return {
    isSelecting,
    startSelecting,
    stopSelecting,
  }
})

export default useSelectorStore
