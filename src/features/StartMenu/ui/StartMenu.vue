<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useAppStore } from '@/entities'
import AppItem from './AppItem.vue'

const emit = defineEmits<{
  close: []
}>()

const appStore = useAppStore()
const searchQuery = ref('')

const filteredApps = computed(() => {
  if (!searchQuery.value) {
    return appStore.apps
  }
  return appStore.apps.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Element
  if (!target.closest('.start-menu') && !target.closest('.start-button')) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="start-menu">
    <!-- Поиск -->
    <div class="search-section">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Поиск программ..."
        class="search-input"
      />
    </div>

    <!-- Список приложений -->
    <div class="apps-section">
      <div class="apps-grid">
        <AppItem v-for="app in filteredApps" :key="app.id" :app="app" @click="$emit('close')" />
      </div>
    </div>

    <!-- Нижняя панель -->
    <div class="bottom-section">
      <button class="power-button" title="Выключение">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2v10l8-8c-2.36-2.36-5.64-3.64-8-3.64s-5.64 1.28-8 3.64l8 8V2z" />
        </svg>
      </button>
      <button class="settings-button" title="Настройки">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.start-menu {
  width: 320px;
  height: 400px;
  background: rgba(30, 30, 30, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid #404040;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
}

.search-section {
  padding: 12px;
  border-bottom: 1px solid #404040;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #555;
  border-radius: 4px;
  color: white;
  font-size: 14px;
}

.search-input::placeholder {
  color: #aaa;
}

.apps-section {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
}

.bottom-section {
  padding: 8px 12px;
  border-top: 1px solid #404040;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.power-button,
.settings-button {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 4px;
  color: #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.power-button:hover,
.settings-button:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}
</style>
