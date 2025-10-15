<script setup lang="ts">
import { IconStack2 } from '@tabler/icons-vue'

interface Props {
  active?: boolean
}

defineProps<Props>()
</script>

<template>
  <button class="start-button" :class="{ active }">
    <IconStack2 :size="20" />
  </button>
</template>

<style scoped>
.start-button {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  color: white;
}

.start-button:hover {
  background: linear-gradient(135deg, #5ba0f2 0%, #4682b4 100%);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
}

.start-button.active {
  background: linear-gradient(135deg, #357abd 0%, #2968a3 100%);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
}
</style>
