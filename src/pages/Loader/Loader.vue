<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useUsersStore } from '@/shared/stores'
import { IconStack2 } from '@tabler/icons-vue'
import { OSLogo } from '@/entities'

const progress = ref(0)
const usersStore = useUsersStore()

const simulateLoading = () => {
  const interval = setInterval(() => {
    progress.value += Math.random() * 15 + 5

    if (progress.value >= 100) {
      progress.value = 100
      usersStore.setLoading(false)
      clearInterval(interval)
    }
  }, 200)
}

watch(
  () => usersStore.isLoading,
  (isLoading) => {
    if (isLoading) {
      simulateLoading()
    } else {
      progress.value = 0
    }
  },
)

onMounted(() => {
  simulateLoading()
})
</script>

<template>
  <Transition name="fade">
    <div v-if="usersStore.isLoading" class="loader-overlay">
      <div class="background-gradient"></div>

      <div class="loader-container">
        <div class="os-header">
          <OSLogo :size="48" show-title title-size="large" />
          <p class="os-subtitle">System loading...</p>
        </div>

        <div class="loading-section">
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            </div>
            <div class="progress-text">{{ Math.round(progress) }}%</div>
          </div>

          <div class="loading-dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
      </div>

      <div class="loader-footer">
        <p>© 2025 PortOS.</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.background-gradient {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: -1;
}

.loader-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 3rem;
}

.os-header {
  text-align: center;
  color: white;
  margin-bottom: 1rem;
}

.os-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 400;
  margin: 0.5rem 0 0;
}

.loading-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 400px;
}

.progress-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffffff 0%, #e0e0e0 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.progress-text {
  text-align: center;
  color: white;
  font-size: 0.9rem;
  opacity: 0.8;
}

.loading-dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  animation: pulse 1.5s ease-in-out infinite;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

.loader-footer {
  text-align: center;
  padding: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
}

.loader-footer p {
  margin: 0;
}

/* Анимации */
@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .loader-container {
    padding: 1rem;
    gap: 2rem;
  }

  .loading-section {
    max-width: 300px;
  }
}
</style>
