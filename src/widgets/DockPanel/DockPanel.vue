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
    <!-- Стартовое меню (появляется поверх панели) -->
    <StartMenu v-if="isStartMenuOpen" @close="closeStartMenu" class="start-menu-overlay" />

    <!-- Основная панель -->
    <div class="panel-content">
      <!-- Левая часть - кнопка Пуск -->
      <div class="panel-left">
        <StartButton @click="toggleStartMenu" :active="isStartMenuOpen" />
      </div>

      <!-- Центральная часть - список задач -->
      <div class="panel-center">
        <TaskList />
      </div>

      <!-- Правая часть - системный трей и время -->
      <div class="panel-right">
        <SystemTray />
        <ClockWidget />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dock-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: linear-gradient(180deg, #2a2a2a 0%, #1e1e1e 100%);
  border-top: 1px solid #404040;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
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
  padding: 0 8px;
}

.panel-left {
  flex-shrink: 0;
}

.panel-center {
  flex: 1;
  margin: 0 8px;
  min-width: 0;
}

.panel-right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
