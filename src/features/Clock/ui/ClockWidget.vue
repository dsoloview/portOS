<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref(new Date())
let timeInterval: number | null = null

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const updateTime = () => {
  currentTime.value = new Date()
}

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<template>
  <div class="clock-widget">
    <div class="time">{{ formatTime(currentTime) }}</div>
    <div class="date">{{ formatDate(currentTime) }}</div>
  </div>
</template>


<style scoped>
.clock-widget {
  padding: 6px 12px;
  text-align: right;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(209, 213, 219, 0.5);
}

.clock-widget:hover {
  background: rgba(243, 244, 246, 0.8);
  border-color: #3b82f6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.time {
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
}

.date {
  color: #6b7280;
  font-size: 11px;
  line-height: 1.2;
  font-weight: 500;
}
</style>
