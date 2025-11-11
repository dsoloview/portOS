import { defineStore } from 'pinia'
import type { Task } from './types'
import { computed, ref } from 'vue'
import type { App } from '@/entities'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([
    { id: '1', name: 'Firefox', isActive: true, appId: '1', isHidden: false },
    { id: '2', name: 'Kate', isActive: false, appId: '2', isHidden: false },
    { id: '3', name: 'Konsole', isActive: false, appId: '4', isHidden: false }
  ]);

  const runningTasks = ref<Task[]>([
    { id: '1', name: 'Firefox', isActive: true, appId: '1', isHidden: false },
    { id: '2', name: 'Kate', isActive: false, appId: '2', isHidden: false },
    { id: '3', name: 'Konsole', isActive: false, appId: '4', isHidden: false }
  ])

  const shownTasks = computed(() => {
    return runningTasks.value.filter(task => !task.isHidden)
  })

  const hideTask = (id: string) => {
    runningTasks.value = runningTasks.value.map(task => {
      if (task.id === id) {
        return { ...task, isHidden: true }
      }
      return task
    })
  }

  const showTask = (id: string) => {
    runningTasks.value = runningTasks.value.map(task => {
      if (task.id === id) {
        return { ...task, isHidden: false }
      }
      return task
    })
  }

  const makeActive = (id: string) => {
    runningTasks.value = runningTasks.value.map(task => {
      if (task.id === id) {
        return { ...task, isActive: true }
      }
      return { ...task, isActive: false }
    })
  }

  const stopTask = (id: string) => {
    runningTasks.value = runningTasks.value.filter(task => task.id !== id)
  }

  const startTask = (id: string) => {
  }

  return {
    tasks,
    shownTasks,
    runningTasks,
    makeActive,
    hideTask,
    showTask,
    stopTask,
    startTask
  }
})
