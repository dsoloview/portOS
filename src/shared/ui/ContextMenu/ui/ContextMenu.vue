<script setup lang="ts">
import { computed } from 'vue'
import ContextMenuItem from './ContextMenuItem.vue'
import type {
  ContextMenuItem as IContextMenuItem,
  ContextMenuPosition,
  ContextMenuEmits
} from '../model/types'

interface Props {
  items: IContextMenuItem[]
  position: ContextMenuPosition
  visible: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<ContextMenuEmits>()

const menuStyle = computed(() => ({
  left: `${props.position.x}px`,
  top: `${props.position.y}px`
}))

const handleItemClick = (item: IContextMenuItem) => {
  emit('itemClick', item)
  if (!item.children) {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition
      name="context-menu"
      appear
    >
      <div
        v-if="visible"
        class="context-menu"
        :style="menuStyle"
        @contextmenu.prevent
      >
        <ContextMenuItem
          v-for="item in items"
          :key="item.id"
          :item="item"
          @click="handleItemClick"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.context-menu {
  position: fixed;
  z-index: 9999;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 160px;
  max-width: 300px;
  padding: 4px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow: hidden;
}

/* Анимации */
.context-menu-enter-active {
  transition: all 0.15s ease-out;
}

.context-menu-leave-active {
  transition: all 0.1s ease-in;
}

.context-menu-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}

.context-menu-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
