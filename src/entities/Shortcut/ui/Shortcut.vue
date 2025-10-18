<script setup lang="ts">
import { computed, ref } from 'vue'
import { useShortcutsStore } from '@/entities'
import type { ShortcutEntity } from '@/shared/db'
import { ContextMenu, createMenuItem, useContextMenu } from '@/shared/ui'
import { useDragAndDrop, useClickOutside } from '@/shared/composables'

interface Props {
  shortcut: ShortcutEntity
}

interface Emits {
  click: []
  doubleClick: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const shortcutRef = ref<HTMLElement>()
const contextMenu = useContextMenu()
const shortcutsStore = useShortcutsStore()

const {
  isDragging,
  hasDragged,
  handleDragStart
} = useDragAndDrop({
  onPositionUpdate: (coordinate) => {
    shortcutsStore.updateShortcut(props.shortcut.id, { coordinate })
  }
})

const handleClick = () => {
  shortcutsStore.setSelected(props.shortcut.id, true)

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

useClickOutside(shortcutRef, () => {
  if (props.shortcut.selected) {
    shortcutsStore.setSelected(props.shortcut.id, false)
  }
}, {
  excludeAltKey: true
})

const handleDelete = () => {
  shortcutsStore.deleteShortcut(props.shortcut.id)
}

const menuItems = [createMenuItem('delete', 'Удалить', handleDelete)]

const showMenu = (event: MouseEvent) => {
  contextMenu.show(event, menuItems)
}

const shortcutStyle = computed(() => ({
  left: `${props.shortcut.coordinate.x}%`,
  top: `${props.shortcut.coordinate.y}%`,
}))

const shortcutClasses = computed(() => [
  'shortcut',
  {
    'shortcut--dragging': isDragging.value,
    'shortcut--selected': props.shortcut.selected
  },
])

const handleMouseDown = (event: MouseEvent) => {
  handleDragStart(event, props.shortcut.coordinate)
}
</script>

<template>
  <div
    ref="shortcutRef"
    :style="shortcutStyle"
    :class="shortcutClasses"
    :title="shortcut.name"
    @click="handleClick"
    @dblclick="handleDoubleClick"
    @mousedown.left="handleMouseDown"
    @contextmenu="showMenu"
  >
    <div class="shortcut__icon">
      {{ shortcut.icon }}
    </div>
    <div class="shortcut__title">
      {{ shortcut.name }}
    </div>
    <ContextMenu
      :items="contextMenu.items.value"
      :position="contextMenu.position"
      :visible="contextMenu.visible.value"
      @close="contextMenu.hide"
    />
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

.shortcut:hover:not(.shortcut--dragging),
.shortcut--selected {
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
