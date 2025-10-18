<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ContextMenuItem as IContextMenuItem } from '../model/types'

interface Props {
  item: IContextMenuItem
}

interface Emits {
  click: [item: IContextMenuItem]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const submenuVisible = ref(false)

const hasChildren = computed(() =>
  props.item.children && props.item.children.length > 0
)

const submenuStyle = computed(() => ({
  left: '100%',
  top: '0'
}))

const handleClick = () => {
  if (props.item.disabled) return

  if (!hasChildren.value) {
    props.item.onClick?.()
    emit('click', props.item)
  }
}

const showSubmenu = () => {
  if (hasChildren.value && !props.item.disabled) {
    submenuVisible.value = true
  }
}

const hideSubmenu = () => {
  submenuVisible.value = false
}
</script>

<template>
  <div
    v-if="item.separator"
    class="context-menu-separator"
  />
  <div
    v-else
    class="context-menu-item"
    :class="{
      'context-menu-item--disabled': item.disabled,
      'context-menu-item--has-children': hasChildren
    }"
    @click="handleClick"
    @mouseenter="showSubmenu"
    @mouseleave="hideSubmenu"
  >
    <div class="context-menu-item__content">
      <span class="context-menu-item__label">{{ item.label }}</span>
      <span
        v-if="item.shortcut"
        class="context-menu-item__shortcut"
      >
        {{ item.shortcut }}
      </span>
      <span
        v-if="hasChildren"
        class="context-menu-item__arrow"
      >
        ▶
      </span>
    </div>

    <!-- Подменю -->
    <div
      v-if="hasChildren && submenuVisible"
      class="context-menu-submenu"
      :style="submenuStyle"
    >
      <ContextMenuItem
        v-for="child in item.children"
        :key="child.id"
        :item="child"
        @click="$emit('click', child)"
      />
    </div>
  </div>
</template>

<style scoped>
.context-menu-separator {
  height: 1px;
  background-color: #e1e5e9;
  margin: 4px 8px;
}

.context-menu-item {
  position: relative;
  padding: 8px 12px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s ease;
}

.context-menu-item:hover:not(.context-menu-item--disabled) {
  background-color: #f5f7fa;
}

.context-menu-item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.context-menu-item--has-children {
  padding-right: 24px;
}

.context-menu-item__content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.context-menu-item__icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.context-menu-item__label {
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
}

.context-menu-item__shortcut {
  font-size: 12px;
  color: #6c757d;
  margin-left: auto;
}

.context-menu-item__arrow {
  position: absolute;
  right: 8px;
  font-size: 10px;
  color: #6c757d;
}

.context-menu-submenu {
  position: absolute;
  z-index: 10000;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 150px;
}
</style>
