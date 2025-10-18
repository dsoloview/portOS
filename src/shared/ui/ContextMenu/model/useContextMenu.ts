import { ref, reactive, onMounted, onUnmounted } from 'vue'
import type { ContextMenuItem, ContextMenuPosition } from './types'
import { ContextMenuManager } from '@/shared/ui/ContextMenu/lib'

export const useContextMenu = () => {
  const visible = ref(false)
  const position = reactive<ContextMenuPosition>({ x: 0, y: 0 })
  const items = ref<ContextMenuItem[]>([])

  let unregister: (() => void) | null = null

  const show = (event: MouseEvent, menuItems: ContextMenuItem[]) => {
    event.preventDefault()
    event.stopPropagation()

    unregister = ContextMenuManager.register(hide)

    const menuWidth = 200
    const menuHeight = menuItems.length * 32

    let x = event.clientX
    let y = event.clientY

    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth - 10
    }

    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight - 10
    }

    position.x = Math.max(10, x)
    position.y = Math.max(10, y)
    items.value = menuItems
    visible.value = true
  }

  const hide = () => {
    visible.value = false
    items.value = []

    if (unregister) {
      unregister()
      unregister = null
    }
  }

  const hideAllContextMenus = () => {
    ContextMenuManager.hideAll()
  }

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.context-menu')) {
      ContextMenuManager.hideAll()
    }
  }

  const handleHideAll = () => {
    hide()
  }

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      ContextMenuManager.hideAll()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    ContextMenuManager.addEventListener('hideAll', handleHideAll)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', handleEscape)
    ContextMenuManager.removeEventListener('hideAll', handleHideAll)

    if (unregister) {
      unregister()
    }
  })

  return {
    visible,
    position,
    items,
    show,
    hide,
    hideAllContextMenus,
  }
}
