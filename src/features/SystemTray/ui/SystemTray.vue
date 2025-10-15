<script setup lang="ts">
import { computed } from 'vue'
import { useSystemStore } from '@/entities'

const systemStore = useSystemStore()

const batteryLevel = computed(() => systemStore.batteryLevel)
const networkStatus = computed(() => systemStore.networkStatus)
const volumeLevel = computed(() => systemStore.volumeLevel)
</script>

<template>
  <div class="system-tray">
    <!-- Индикатор сети -->
    <div class="tray-item" title="Сеть">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path v-if="networkStatus === 'connected'"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        <path v-else
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
      </svg>
    </div>

    <!-- Индикатор звука -->
    <div class="tray-item" title="Звук">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path v-if="volumeLevel > 50"
              d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        <path v-else-if="volumeLevel > 0"
              d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
        <path v-else
              d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
      </svg>
    </div>

    <!-- Индикатор батареи (если есть) -->
    <div v-if="batteryLevel !== null" class="tray-item" :title="`Батарея: ${batteryLevel}%`">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.system-tray {
  display: flex;
  align-items: center;
  gap: 6px;
}

.tray-item {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(209, 213, 219, 0.6);
}

.tray-item:hover {
  background: rgba(243, 244, 246, 0.8);
  border-color: #3b82f6;
  color: #3b82f6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}
</style>
