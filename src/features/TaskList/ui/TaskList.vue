<script setup lang="ts">
import { computed } from 'vue'
import TaskItem from './TaskItem.vue'
import { useTaskStore } from '@/entities'

const taskStore = useTaskStore()

const runningTasks = computed(() => taskStore.runningTasks)

const showTask = (id: string) => {
  taskStore.makeActive(id)
  taskStore.showTask(id)
}
</script>

<template>
  <div class="task-list">
    <TaskItem
      v-for="task in runningTasks"
      :key="task.id"
      :task="task"
      @click="showTask(task.id)"
    />
  </div>
</template>

<style scoped>
.task-list {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 4px;
}

.task-list::-webkit-scrollbar {
  display: none;
}
</style>
