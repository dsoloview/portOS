<script setup lang="ts">
import type { App } from '@/entities'

interface Props {
  app: App
}

defineProps<Props>()
defineEmits<{
  click: []
}>()

</script>

<template>
  <div
    class="app-item"
    @click="$emit('click')"
    :title="app.name"
  >
    <div class="app-icon">
      <img v-if="app.icon" :src="app.icon" :alt="app.name" />
      <div v-else class="default-icon">{{ app.name.charAt(0) }}</div>
    </div>
    <div class="app-name">{{ app.name }}</div>
  </div>
</template>

<style scoped>
.app-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.app-item:hover {
  background: rgba(59, 130, 246, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.app-icon {
  width: 32px;
  height: 32px;
  margin-bottom: 4px;
}

.app-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.default-icon {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3b82f6, #1e40af);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-name {
  font-size: 11px;
  color: #374151;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
