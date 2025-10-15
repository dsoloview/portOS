<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useAppStore } from '@/entities'
import AppItem from './AppItem.vue'
import { IconLogout } from '@tabler/icons-vue'
import { useUsersStore } from '@/shared/stores'

const emit = defineEmits<{
  close: []
}>()

const appStore = useAppStore()
const usersStore = useUsersStore()
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
  <Transition name="start-menu" appear>
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

      <div class="bottom-section">
        <button class="power-button" title="Logout" @click="usersStore.logout" aria-label="Logout">
          <IconLogout size="16" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.start-menu-enter-active {
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.start-menu-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.6, 1);
}

.start-menu-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.start-menu-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

.start-menu {
  width: 320px;
  height: 400px;
  background: rgba(248, 249, 250, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid #d1d5db;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  transform-origin: bottom center;
}

.search-section {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  color: #374151;
  font-size: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-input::placeholder {
  color: #9ca3af;
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
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  background: rgba(249, 250, 251, 0.8);
}

.power-button {
  width: 32px;
  height: 32px;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.power-button:hover {
  background: #f3f4f6;
  border-color: #3b82f6;
  color: #3b82f6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
