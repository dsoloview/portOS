export interface ContextMenuItem {
  id: string
  label: string
  icon?: string
  disabled?: boolean
  separator?: boolean
  children?: ContextMenuItem[]
  onClick?: () => void
  shortcut?: string
}

export interface ContextMenuPosition {
  x: number
  y: number
}

export interface ContextMenuProps {
  items: ContextMenuItem[]
  position: ContextMenuPosition
  visible: boolean
}

export interface ContextMenuEmits {
  close: []
  itemClick: [item: ContextMenuItem]
}
