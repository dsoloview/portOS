<script setup lang="ts">

import type { Task } from '@/entities'

interface Props {
  task: Task
}

defineProps<Props>()
</script>

<template>
  <div
    class="task-item"
    :class="{ active: task.isActive }"
    :title="task.name"
  >
    <div class="task-icon">
      <img v-if="task.icon" :src="task.icon" :alt="task.name" />
      <div v-else class="default-task-icon">{{ task.name.charAt(0) }}</div>
    </div>
    <span class="task-name">{{ task.name }}</span>
  </div>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  max-width: 200px;
}

.task-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.task-item.active {
  background: rgba(74, 144, 226, 0.3);
  border-color: #4a90e2;
}

.task-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.task-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.default-task-icon {
  width: 100%;
  height: 100%;
  background: #4a90e2;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: bold;
}

.task-name {
  color: #ccc;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
