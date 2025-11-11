<script setup lang="ts">
import { computed, ref } from 'vue'
import { useShortcutsStore } from '@/entities'
import useSelectorStore from '@/shared/stores/selectorStore.ts'

const wasSelected = ref(false)
const selectorField = ref<HTMLDivElement | null>(null)
const shortcutsStore = useShortcutsStore()
const selectorStore = useSelectorStore()

const startX = ref(0)
const startY = ref(0)

const endX = ref(0)
const endY = ref(0)

const handleMouseDown = (event: MouseEvent) => {
  if (
    shortcutsStore.hasIntersectingShortcuts(
      event.clientX,
      event.clientY,
      event.clientX,
      event.clientY,
    )
  ) {
    return
  }

  selectorStore.startSelecting()
  wasSelected.value = false
  startX.value = event.clientX
  startY.value = event.clientY
  endX.value = event.clientX
  endY.value = event.clientY
}

const handleMouseMove = async (event: MouseEvent) => {
  if (selectorStore.isSelecting) {
    endX.value = event.clientX
    endY.value = event.clientY

    const selectedCount = await shortcutsStore.selectIntersectedShortcuts(
      startX.value,
      startY.value,
      endX.value,
      endY.value,
    )

    if (selectedCount) {
      wasSelected.value = true
    }
  }
}

const handleMouseUp = () => {
  selectorStore.stopSelecting()
}

const handleClick = (event: MouseEvent) => {
  if (wasSelected.value) {
    event.preventDefault()
    event.stopPropagation()
  }

  wasSelected.value = false
}

const rectangleStyle = computed(() => {
  if (!selectorStore.isSelecting) return {}
  const x = Math.min(startX.value, endX.value)
  const y = Math.min(startY.value, endY.value)
  const width = Math.abs(endX.value - startX.value)
  const height = Math.abs(endY.value - startY.value)
  return {
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
  }
})
</script>

<template>
  <div
    class="selector"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @click="handleClick"
  >
    <div
      class="selector__field"
      ref="selectorField"
      :style="rectangleStyle"
      v-if="selectorStore.isSelecting"
    ></div>
    <slot />
  </div>
</template>

<style scoped>
.selector {
  width: 100%;
  height: 100%;
}

.selector__field {
  position: absolute;
  border: 2px solid #007bff;
  pointer-events: none;
  z-index: 900;
  background-color: rgba(0, 123, 255, 0.2);
}
</style>
