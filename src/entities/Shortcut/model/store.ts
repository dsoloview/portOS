import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUsersStore } from '@/shared/stores'
import { portOsDatabase, type ShortcutEntity } from '@/shared/db'

export const useShortcutsStore = defineStore('shortcuts', () => {
  const usersStore = useUsersStore()
  const shortcuts = ref<ShortcutEntity[]>([])

  const loadShortcuts = async () => {
    if (!usersStore.currentUser) return []
    shortcuts.value = await portOsDatabase.shortcuts
      .where('userId')
      .equals(usersStore.currentUser.id)
      .toArray()
  }

  const addShortcut = async (shortcut: Omit<ShortcutEntity, 'createdAt' | 'updatedAt'>) => {
    const now = new Date()
    const shortcutWithTimestamps: ShortcutEntity = {
      ...shortcut,
      createdAt: now,
      updatedAt: now,
    }

    await portOsDatabase.shortcuts.add(shortcutWithTimestamps)
    shortcuts.value.push(shortcutWithTimestamps)
  }

  const updateShortcut = async (
    id: string,
    updates: Partial<Pick<ShortcutEntity, 'name' | 'coordinate'>>,
  ) => {
    const index = shortcuts.value.findIndex((s) => s.id === id)
    if (index !== -1) {
      shortcuts.value[index] = { ...shortcuts.value[index], ...updates } as ShortcutEntity
    }

    await portOsDatabase.shortcuts.update(id, {
      ...updates,
      updatedAt: new Date(),
    })
  }

  const setSelected = (id: string, selected: boolean) => {
    const index = shortcuts.value.findIndex((s) => s.id === id)
    if (index !== -1) {
      shortcuts.value[index] = { ...shortcuts.value[index], selected } as ShortcutEntity
    }
  }

  const unselectShortcuts = () => {
    shortcuts.value = shortcuts.value.map((s) => ({ ...s, selected: false }))
  }

  const deleteShortcut = async (id: string): Promise<void> => {
    await portOsDatabase.shortcuts.delete(id)
    shortcuts.value = shortcuts.value.filter((s) => s.id !== id)
  }

  const deleteShortcutsByUserId = async (userId: string): Promise<void> => {
    await portOsDatabase.shortcuts.where('userId').equals(userId).delete()
  }

  return {
    shortcuts,
    loadShortcuts,
    addShortcut,
    updateShortcut,
    deleteShortcut,
    deleteShortcutsByUserId,
    setSelected,
    unselectShortcuts,
  }
})
