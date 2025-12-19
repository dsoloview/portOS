<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import { useShortcutsStore } from '@/entities'
import type { ShortcutEntity } from '@/shared/db'
import { ContextMenu, createMenuItem, useContextMenu } from '@/shared/ui'
import { useClickOutside } from '@/shared/composables'
import { useDraggable } from '@vueuse/core'
import { percentToPixels, pixelsToPercent } from '@/shared/helpers'

interface Props {
  shortcut: ShortcutEntity
}

interface Emits {
  click: []
  doubleClick: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const shortcutRef = useTemplateRef('shortcutRef')
const contextMenu = useContextMenu()
const shortcutsStore = useShortcutsStore()
const hasDragged = ref(false)

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

const { x, y, isDragging, position } = useDraggable(shortcutRef, {
  initialValue: {
    x: percentToPixels(props.shortcut.coordinate.x, false),
    y: percentToPixels(props.shortcut.coordinate.y, true),
  },
  containerElement: shortcutRef.value?.parentElement,
  preventDefault: true,
  onMove: (pos) => {
    const el = shortcutRef.value
    const container = el?.parentElement
    if (!el || !container) return

    const cr = container.getBoundingClientRect()

    const w = 80
    const h = 80

    const maxX = Math.max(0, cr.width - w)
    const maxY = Math.max(0, cr.height - h)

    x.value = clamp(pos.x, 0, maxX)
    y.value = clamp(pos.y, 0, maxY)
  },
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

useClickOutside(
  shortcutRef,
  () => {
    if (props.shortcut.selected) {
      shortcutsStore.setSelected(props.shortcut.id, false)
    }
  },
  {
    excludeAltKey: true,
  },
)

watch(isDragging, () => {
  if (isDragging.value) {
    hasDragged.value = true
    return
  }
  if (!isDragging.value && hasDragged.value) {
    const xPerc = pixelsToPercent(position.value.x, false)
    const yPerc = pixelsToPercent(position.value.y, true)
    shortcutsStore.updateShortcut(props.shortcut.id, { coordinate: { x: xPerc, y: yPerc } })
    setTimeout(() => {
      hasDragged.value = false
    }, 1000)
  }
})

const handleDelete = () => {
  shortcutsStore.deleteSelectedShortcuts()
}

const menuItems = [createMenuItem('delete', 'Удалить', handleDelete)]

const showMenu = (event: MouseEvent) => {
  contextMenu.show(event, menuItems)
}

const shortcutStyle = computed(() => {
  const xPercent = pixelsToPercent(position.value.x, false)
  const yPercent = pixelsToPercent(position.value.y, true)
  return {
    left: `${xPercent}%`,
    top: `${yPercent}%`,
  }
})

const shortcutClasses = computed(() => [
  'shortcut',
  {
    'shortcut--dragging': isDragging.value,
    'shortcut--selected': props.shortcut.selected,
  },
])
</script>

<template>
  <div
    ref="shortcutRef"
    :style="shortcutStyle"
    :class="shortcutClasses"
    :title="shortcut.name"
    @click="handleClick"
    @dblclick="handleDoubleClick"
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
