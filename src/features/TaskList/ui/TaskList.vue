<script setup lang="ts">
import { computed } from 'vue'
import TaskItem from './TaskItem.vue'
import { useTaskStore } from '@/entities'

const taskStore = useTaskStore()

const runningTasks = computed(() => taskStore.runningTasks)
</script>

<template>
  <div class="task-list">
    <TaskItem
      v-for="task in runningTasks"
      :key="task.id"
      :task="task"
    />
  </div>
</template>

<style scoped>
.task-list {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.task-list::-webkit-scrollbar {
  display: none;
}
</style>
