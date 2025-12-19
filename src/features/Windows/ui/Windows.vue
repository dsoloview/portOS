<script setup lang="ts">
import { useTaskStore } from '@/entities'
import { Window } from '@/entities/Window'

const taskStore = useTaskStore()

const makeActive = (id: string) => {
  taskStore.makeActive(id)
}

const closeWindow = (id: string) => {
  taskStore.stopTask(id)
}

const minimizeWindow = (id: string) => {
  taskStore.hideTask(id)
}
</script>

<template>
  <Window
    :id="task.id"
    v-for="task in taskStore.shownTasks"
    :isActive="task.isActive"
    :key="task.id"
    :title="task.name"
    @mousedown="makeActive(task.id)"
    @minimize="minimizeWindow(task.id)"
    @close="closeWindow(task.id)"
  >
  </Window>
</template>

<style scoped></style>
