<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref(new Date())
let timeInterval: NodeJS.Timeout

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
  padding: 4px 8px;
  text-align: right;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clock-widget:hover {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.time {
  color: white;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
}

.date {
  color: #aaa;
  font-size: 11px;
  line-height: 1.2;
}
</style>
