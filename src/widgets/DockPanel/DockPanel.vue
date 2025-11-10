<script setup lang="ts">
import { ref } from 'vue'
import { ClockWidget, StartButton, StartMenu, SystemTray, TaskList } from '@/features'

const isStartMenuOpen = ref(false)

const toggleStartMenu = () => {
  isStartMenuOpen.value = !isStartMenuOpen.value
}

const closeStartMenu = () => {
  isStartMenuOpen.value = false
}
</script>

<template>
  <div class="dock-panel">
    <StartMenu v-if="isStartMenuOpen" @close="closeStartMenu" class="start-menu-overlay" />

    <div class="panel-content">
      <div class="panel-left">
        <StartButton @click="toggleStartMenu" :active="isStartMenuOpen" />
      </div>

      <div class="panel-center">
        <TaskList />
      </div>

      <div class="panel-right">
        <SystemTray />
        <ClockWidget />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dock-panel {
  height: 48px;
  width: 100%;
  background: rgba(248, 249, 250, 0.95);
  backdrop-filter: blur(12px);
  border-top: 1px solid #e5e7eb;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.start-menu-overlay {
  position: absolute;
  bottom: 48px;
  left: 0;
  z-index: 1001;
}

.panel-content {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 12px;
}

.panel-left {
  flex-shrink: 0;
}

.panel-center {
  flex: 1;
  margin: 0 12px;
  min-width: 0;
}

.panel-right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
