import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSystemStore = defineStore('system', () => {
  const batteryLevel = ref<number>(85)
  const networkStatus = ref<'connected' | 'disconnected'>('connected')
  const volumeLevel = ref<number>(75)

  return {
    batteryLevel,
    networkStatus,
    volumeLevel
  }
})
