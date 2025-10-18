class ContextMenuManager {
  private activeMenus = new Set<() => void>()
  private eventTarget = new EventTarget()

  register(hideCallback: () => void): () => void {
    this.hideAll()
    this.activeMenus.add(hideCallback)
    return () => {
      this.activeMenus.delete(hideCallback)
    }
  }

  hideAll(): void {
    this.activeMenus.forEach(hide => hide())
    this.activeMenus.clear()

    this.eventTarget.dispatchEvent(new CustomEvent('hideAll'))
  }

  addEventListener(type: string, listener: EventListener): void {
    this.eventTarget.addEventListener(type, listener)
  }

  removeEventListener(type: string, listener: EventListener): void {
    this.eventTarget.removeEventListener(type, listener)
  }
}

export default new ContextMenuManager()
