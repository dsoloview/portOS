<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue'
import useSelectorStore from '@/shared/stores/selectorStore.ts'
import { useDraggable } from '@vueuse/core'
import { percentToPixels } from '@/shared/helpers'
import { useTaskStore } from '@/entities'

interface Props {
  id: string
  title?: string
  width?: number
  height?: number
  x?: number
  y?: number
  resizable?: boolean
  maximized?: boolean
  isActive?: boolean
}

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'minimize'): void
}>()

const props = withDefaults(defineProps<Props>(), {
  title: 'Окно',
  width: 600,
  height: 450,
  x: 10,
  y: 10,
  resizable: true,
  maximized: false,
  isActive: false,
})

const taskStore = useTaskStore()
const selectorStore = useSelectorStore()
const windowRef = useTemplateRef('windowRef')
const titleBarRef = useTemplateRef('titleBar')
const isMaximized = ref(props.maximized)
const isDragInitialized = ref(false)

const windowSize = ref({
  width: props.width,
  height: props.height,
})

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

const { isDragging, x, y } = useDraggable(windowRef, {
  preventDefault: true,
  handle: titleBarRef,
  initialValue: {
    x: percentToPixels(props.x, false),
    y: percentToPixels(props.y, true),
  },
  onStart: () => {
    taskStore.makeActive(props.id)
    isDragInitialized.value = true
  },
  onMove: (pos) => {
    const el = windowRef.value
    const container = el?.parentElement
    if (!el || !container) return

    const cr = container.getBoundingClientRect()

    const w = windowSize.value.width
    const h = windowSize.value.height

    const maxX = Math.max(0, cr.width - w)
    const maxY = Math.max(0, cr.height - h)

    x.value = clamp(pos.x, 0, maxX)
    y.value = clamp(pos.y, 0, maxY)
  },
  onEnd: () => {
    isDragInitialized.value = false
  },
  disabled: isMaximized,
})

const windowStyle = computed(() => {
  const baseStyle: Record<string, string> = {
    ...(isMaximized.value
      ? {
          width: '100vw',
          height: '100vh',
          left: '0px',
          top: '0px',
        }
      : {
          width: windowSize.value.width + 'px',
          height: windowSize.value.height + 'px',
          left: x.value + 'px',
          top: y.value + 'px',
        }),
  }

  baseStyle.zIndex = props.isActive ? '1000' : '999'

  if (selectorStore.isSelecting) {
    baseStyle.pointerEvents = 'none'
  }

  return baseStyle
})

const toggleMaximize = () => {
  taskStore.makeActive(props.id)
  isMaximized.value = !isMaximized.value
}

const minimizeWindow = () => {
  emit('minimize')
}

const closeWindow = () => {
  emit('close')
}
</script>

<template>
  <div
    ref="windowRef"
    class="plasma-window"
    :class="{
      maximized: isMaximized,
      dragging: isDragging,
      'drag-initiated': isDragInitialized,
    }"
    :style="windowStyle"
  >
    <!-- Заголовок окна -->
    <div
      class="title-bar"
      ref="titleBar"
      @dblclick="toggleMaximize"
      @mousedown="() => taskStore.makeActive(id)"
    >
      <div class="title-content">
        <div class="window-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect
              x="2"
              y="3"
              width="12"
              height="10"
              rx="1"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <line x1="2" y1="6" x2="14" y2="6" stroke="currentColor" stroke-width="1" />
          </svg>
        </div>
        <span class="title-text">{{ title }}</span>
      </div>

      <div class="window-controls">
        <button class="control-button minimize" @click.stop="minimizeWindow" title="Свернуть">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </button>

        <button
          class="control-button maximize"
          @click.stop="toggleMaximize"
          :title="isMaximized ? 'Восстановить' : 'Развернуть'"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect
              v-if="!isMaximized"
              x="2"
              y="2"
              width="8"
              height="8"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <g v-else>
              <rect
                x="3"
                y="1"
                width="6"
                height="6"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
              />
              <rect
                x="1"
                y="3"
                width="6"
                height="6"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
              />
            </g>
          </svg>
        </button>

        <button class="control-button close" @click.stop="closeWindow" title="Закрыть">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <line x1="3" y1="3" x2="9" y2="9" stroke="currentColor" stroke-width="1.5" />
            <line x1="9" y1="3" x2="3" y2="9" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Содержимое окна -->
    <div class="window-content">
      <slot>
        <div class="default-content">
          <h3>Содержимое окна</h3>
          <p>Здесь может быть любой контент окна.</p>
          <div class="debug-info" v-if="isDragging">
            <p>Позиция: {{ x }}px, {{ y }}px</p>
            <p>Перетаскивается: {{ isDragging }}</p>
          </div>
        </div>
      </slot>
    </div>

    <div v-if="resizable && !isMaximized" class="resize-handles">
      <div class="resize-handle top"></div>
      <div class="resize-handle right"></div>
      <div class="resize-handle bottom"></div>
      <div class="resize-handle left"></div>
      <div class="resize-handle top-left"></div>
      <div class="resize-handle top-right"></div>
      <div class="resize-handle bottom-left"></div>
      <div class="resize-handle bottom-right"></div>
    </div>
  </div>
</template>

<style scoped>
.plasma-window {
  position: fixed;
  display: flex;
  flex-direction: column;
  background: linear-gradient(145deg, #2a2e37 0%, #232832 100%);
  border: 1px solid #3c4043;
  border-radius: 8px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 2px 8px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.plasma-window.maximized {
  border-radius: 0;
  border: none;
}

.plasma-window.drag-initiated {
  transition: none;
}

.plasma-window.dragging {
  user-select: none;
  cursor: grabbing;
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.5),
    0 4px 16px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transform: scale(1.02);
}

.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: linear-gradient(180deg, #3d434c 0%, #2f353e 100%);
  border-bottom: 1px solid #1a1e23;
  cursor: grab;
  user-select: none;
  min-height: 32px;
}

.dragging .title-bar {
  cursor: grabbing;
}

.title-content {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.window-icon {
  color: #94a3b8;
  display: flex;
  align-items: center;
}

.title-text {
  color: #e2e8f0;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.window-controls {
  display: flex;
  gap: 4px;
}

.control-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.15s ease;
}

.control-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

.control-button.close:hover {
  background: #ef4444;
  color: white;
}

.control-button.minimize:hover {
  background: #f59e0b;
  color: white;
}

.control-button.maximize:hover {
  background: #10b981;
  color: white;
}

.window-content {
  flex: 1;
  padding: 16px;
  background: #1e2328;
  color: #e2e8f0;
  overflow: auto;
  pointer-events: none;
  user-select: none;
}

.default-content {
  text-align: center;
}

.default-content h3 {
  margin: 0 0 12px 0;
  color: #f1f5f9;
  font-size: 18px;
  font-weight: 600;
}

.default-content p {
  margin: 0 0 8px 0;
  color: #94a3b8;
  line-height: 1.6;
}

.debug-info {
  margin-top: 16px;
  padding: 8px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 4px;
  font-size: 12px;
  color: #60a5fa;
}

.resize-handles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.resize-handle {
  position: absolute;
  pointer-events: all;
}

.resize-handle.top {
  top: 0;
  left: 8px;
  right: 8px;
  height: 4px;
  cursor: n-resize;
}

.resize-handle.right {
  top: 8px;
  right: 0;
  bottom: 8px;
  width: 4px;
  cursor: e-resize;
}

.resize-handle.bottom {
  bottom: 0;
  left: 8px;
  right: 8px;
  height: 4px;
  cursor: s-resize;
}

.resize-handle.left {
  top: 8px;
  left: 0;
  bottom: 8px;
  width: 4px;
  cursor: w-resize;
}

.resize-handle.top-left {
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  cursor: nw-resize;
}

.resize-handle.top-right {
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  cursor: ne-resize;
}

.resize-handle.bottom-left {
  bottom: 0;
  left: 0;
  width: 8px;
  height: 8px;
  cursor: sw-resize;
}

.resize-handle.bottom-right {
  bottom: 0;
  right: 0;
  width: 8px;
  height: 8px;
  cursor: se-resize;
}

/* Анимация появления */
@keyframes windowAppear {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.plasma-window {
  animation: windowAppear 0.2s ease-out;
}
</style>
