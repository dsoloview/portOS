import { ref, type Ref } from 'vue'

interface DragState {
  isDragInitiated: Ref<boolean>
  isDragging: Ref<boolean>
  hasDragged: Ref<boolean>
}

interface DragHandlers {
  handleDragStart: (event: MouseEvent, currentPosition: { x: number; y: number }) => void
}

interface UseDragAndDropOptions {
  onPositionUpdate: (coordinate: { x: number; y: number, xPixels: number, yPixels: number }) => void
  threshold?: number
  elementSize?: { width: number; height: number }
}

export function useDragAndDrop(options: UseDragAndDropOptions): DragState & DragHandlers {
  const { onPositionUpdate, threshold = 5, elementSize = { width: 80, height: 80 } } = options

  const isDragInitiated = ref(false)
  const isDragging = ref(false)
  const hasDragged = ref(false)

  let dragOffset = { x: 0, y: 0 }
  let parentRect: DOMRect | null = null

  const pixelsToPercent = (pixels: number, containerSize: number): number => {
    return (pixels / containerSize) * 100
  }

  const percentToPixels = (percent: number, containerSize: number): number => {
    return (percent / 100) * containerSize
  }

  const handleDragStart = (event: MouseEvent, currentPosition: { x: number; y: number }) => {
    const element = event.target as HTMLElement
    parentRect = element.parentElement?.getBoundingClientRect() || element.getBoundingClientRect()

    isDragInitiated.value = true
    hasDragged.value = false

    const currentX = percentToPixels(currentPosition.x, parentRect.width)
    const currentY = percentToPixels(currentPosition.y, parentRect.height)

    dragOffset = {
      x: event.clientX - parentRect.left - currentX,
      y: event.clientY - parentRect.top - currentY,
    }

    document.addEventListener('mousemove', handleDrag, { passive: true })
    document.addEventListener('mouseup', handleDragEnd, { once: true })
  }

  const handleDrag = (event: MouseEvent) => {
    if (!isDragInitiated.value || !parentRect) return

    if (!isDragging.value) {
      const deltaX = Math.abs(event.clientX - (parentRect.left + dragOffset.x))
      const deltaY = Math.abs(event.clientY - (parentRect.top + dragOffset.y))
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      if (distance > threshold) {
        isDragging.value = true
      }
    }

    if (isDragging.value) {
      hasDragged.value = true

      const newPixelX = event.clientX - parentRect.left - dragOffset.x
      const newPixelY = event.clientY - parentRect.top - dragOffset.y

      const shortcutWidthPercent = pixelsToPercent(elementSize.width, parentRect.width)
      const shortcutHeightPercent = pixelsToPercent(elementSize.height, parentRect.height)

      const newPercentX = Math.max(
        0,
        Math.min(100 - shortcutWidthPercent, pixelsToPercent(newPixelX, parentRect.width)),
      )
      const newPercentY = Math.max(
        0,
        Math.min(100 - shortcutHeightPercent, pixelsToPercent(newPixelY, parentRect.height)),
      )

      onPositionUpdate({
        x: Math.round(newPercentX * 100) / 100,
        y: Math.round(newPercentY * 100) / 100,
        xPixels: newPixelX,
        yPixels: newPixelY,
      })
    }
  }

  const handleDragEnd = () => {
    isDragInitiated.value = false
    isDragging.value = false
    parentRect = null
    document.removeEventListener('mousemove', handleDrag)
  }

  return {
    isDragInitiated,
    isDragging,
    hasDragged,
    handleDragStart,
  }
}
