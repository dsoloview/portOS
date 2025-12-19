import { onMounted, onBeforeUnmount, type ShallowRef } from 'vue'

interface UseClickOutsideOptions {
  excludeAltKey?: boolean
}

export function useClickOutside(
  target: Readonly<ShallowRef<HTMLDivElement | null>>,
  handler: () => void,
  options: UseClickOutsideOptions = {},
) {
  const { excludeAltKey = false } = options

  const handleClickOutside = (event: MouseEvent) => {
    const targetElement = target.value
    if (!targetElement) return

    const clickedElement = event.target as HTMLElement

    if (targetElement.contains(clickedElement)) return
    if (excludeAltKey && event.altKey) return

    handler()
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
}
