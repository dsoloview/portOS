<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useShortcutsStore } from '@/entities'
import type { ShortcutEntity } from '@/shared/db'

interface Props {
  shortcut: ShortcutEntity
}

interface Emits {
  click: []
  doubleClick: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isDragInitiated = ref(false)
const isDragging = ref(false)
const hasDragged = ref(false)

const dragThreshold = 5
let dragOffset = { x: 0, y: 0 }
let parentRect: DOMRect | null = null

const shortcutsStore = useShortcutsStore()

const shortcutStyle = computed(() => ({
  left: `${props.shortcut.coordinate.x}%`,
  top: `${props.shortcut.coordinate.y}%`,
}))

const shortcutClasses = computed(() => ['shortcut', { 'shortcut--dragging': isDragging.value }])

const getParentRect = (element: HTMLElement): DOMRect => {
  return element.parentElement?.getBoundingClientRect() || element.getBoundingClientRect()
}

const pixelsToPercent = (pixels: number, containerSize: number): number => {
  return (pixels / containerSize) * 100
}

const percentToPixels = (percent: number, containerSize: number): number => {
  return (percent / 100) * containerSize
}

const handleClick = () => {
  if (hasDragged.value) {
    hasDragged.value = false
    return
  }
  emit('click')
}

const handleDoubleClick = () => {
  if (!hasDragged.value) {
    emit('doubleClick')
  }
}

const handleDragStart = (event: MouseEvent) => {
  const element = event.target as HTMLElement
  parentRect = getParentRect(element)

  isDragInitiated.value = true
  hasDragged.value = false

  const currentX = percentToPixels(props.shortcut.coordinate.x, parentRect.width)
  const currentY = percentToPixels(props.shortcut.coordinate.y, parentRect.height)

  dragOffset = {
    x: event.clientX - parentRect.left - currentX,
    y: event.clientY - parentRect.top - currentY,
  }

  document.addEventListener('mousemove', handleDrag, { passive: true })
  document.addEventListener('mouseup', handleDragEnd, { once: true })
}

const handleDrag = (event: MouseEvent) => {
  if (!isDragInitiated.value || !parentRect) return

  const deltaX = Math.abs(
    event.clientX -
      (parentRect.left + percentToPixels(props.shortcut.coordinate.x, parentRect.width)),
  )
  const deltaY = Math.abs(
    event.clientY -
      (parentRect.top + percentToPixels(props.shortcut.coordinate.y, parentRect.height)),
  )
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

  if (!isDragging.value && distance > dragThreshold) {
    isDragging.value = true
  }

  if (isDragging.value) {
    hasDragged.value = true

    const newPixelX = event.clientX - parentRect.left - dragOffset.x
    const newPixelY = event.clientY - parentRect.top - dragOffset.y

    const shortcutWidth = 80
    const shortcutHeight = 80

    const shortcutWidthPercent = pixelsToPercent(shortcutWidth, parentRect.width)
    const shortcutHeightPercent = pixelsToPercent(shortcutHeight, parentRect.height)

    const newPercentX = Math.max(
      0,
      Math.min(100 - shortcutWidthPercent, pixelsToPercent(newPixelX, parentRect.width)),
    )
    const newPercentY = Math.max(
      0,
      Math.min(100 - shortcutHeightPercent, pixelsToPercent(newPixelY, parentRect.height)),
    )

    const newCoordinate = {
      x: Math.round(newPercentX * 100) / 100,
      y: Math.round(newPercentY * 100) / 100,
    }

    shortcutsStore.updateShortcut(props.shortcut.id, {
      coordinate: newCoordinate,
    })
  }
}

const handleDragEnd = () => {
  isDragInitiated.value = false
  isDragging.value = false
  parentRect = null
  document.removeEventListener('mousemove', handleDrag)
}

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', handleDragEnd)
})
</script>

<template>
  <div
    :style="shortcutStyle"
    :class="shortcutClasses"
    :title="shortcut.name"
    @click="handleClick"
    @dblclick="handleDoubleClick"
    @mousedown="handleDragStart"
  >
    <div class="shortcut__icon">
      {{ shortcut.icon }}
    </div>
    <div class="shortcut__title">
      {{ shortcut.name }}
    </div>
  </div>
</template>

<style scoped>
.shortcut {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  width: 80px;
  height: 80px;
  text-align: center;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.shortcut--dragging {
  opacity: 0.7;
  z-index: 1000;
  transition: none;
  cursor: grabbing;
}

.shortcut:hover:not(.shortcut--dragging) {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.shortcut__icon {
  font-size: 32px;
  margin-bottom: 4px;
  pointer-events: none;
}

.shortcut__title {
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  line-height: 1.2;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  pointer-events: none;
}
</style>
