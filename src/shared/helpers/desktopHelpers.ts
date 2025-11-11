import { useDesktopSizeStore } from '@/shared/stores'

const pixelsToPercent = (pixels: number, vertical: boolean): number => {
  const desktopSizeStore = useDesktopSizeStore();
  const containerSize = vertical ? desktopSizeStore.height : desktopSizeStore.width
  return (pixels / containerSize) * 100
}

const percentToPixels = (percent: number, vertical: boolean): number => {
  const desktopSizeStore = useDesktopSizeStore();
  const containerSize = vertical ? desktopSizeStore.height : desktopSizeStore.width
  return (percent / 100) * containerSize
}

export { pixelsToPercent, percentToPixels }
