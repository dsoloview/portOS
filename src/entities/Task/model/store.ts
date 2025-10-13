import { defineStore } from 'pinia'
import type { Task } from './types'
import { ref } from 'vue'

export const useTaskStore = defineStore('task', () => {
  const runningTasks = ref<Task[]>([
    { id: '1', name: 'Firefox', isActive: true, appId: '1' },
    { id: '2', name: 'Kate', isActive: false, appId: '2' },
    { id: '3', name: 'Konsole', isActive: false, appId: '4' }
  ])

  return {
    runningTasks,
  }
})
