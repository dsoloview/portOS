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
  gap: 10px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 130px;
  max-width: 200px;
  backdrop-filter: blur(12px);
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.6) inset;
  position: relative;
  overflow: hidden;
}

.task-item:hover {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(156, 163, 175, 0.5);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(255, 255, 255, 0.8) inset;
  transform: translateY(-1px);
}

.task-item.active {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(37, 99, 235, 0.12));
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow:
    0 4px 16px rgba(59, 130, 246, 0.15),
    0 0 0 1px rgba(147, 197, 253, 0.3) inset;
}

.task-item.active:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(37, 99, 235, 0.16));
  transform: translateY(-1px);
  box-shadow:
    0 6px 20px rgba(59, 130, 246, 0.2),
    0 0 0 1px rgba(147, 197, 253, 0.4) inset;
}

.task-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.task-item:hover .task-icon {
  transform: scale(1.05);
}

.task-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 4px;
}

.default-task-icon {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 11px;
  font-weight: 700;
  box-shadow:
    0 2px 4px rgba(59, 130, 246, 0.25),
    0 0 0 1px rgba(147, 197, 253, 0.2) inset;
  letter-spacing: 0.5px;
}

.task-name {
  color: #1f2937;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  line-height: 1.3;
  transition: color 0.2s ease;
}

.task-item:hover .task-name {
  color: #111827;
}

.task-item.active .task-name {
  color: #1e40af;
  font-weight: 600;
}
</style>
