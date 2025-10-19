<script setup lang="ts">
import { Shortcut } from '@/entities'
import { useShortcutsStore } from '@/entities'
import { onMounted } from 'vue'
import { useUsersStore } from '@/shared/stores'
import { Selector } from '@/features/Selector'

const shortcutsStore = useShortcutsStore()
const usersStore = useUsersStore()

onMounted(async () => {
  await shortcutsStore.addShortcut({
    id: crypto.randomUUID(),
    userId: usersStore!.currentUser!.id,
    icon: '📁',
    name: 'Picture',
    coordinate: { x: 0, y: 0, xPixels: 0, yPixels: 0 },
  })
  await shortcutsStore.loadShortcuts()
})

const handleShortcutClick = (name: string) => {
  console.log(`Clicked on ${name}`)
}

const handleShortcutDoubleClick = (name: string) => {
  console.log(`Double clicked on ${name}`)
}
</script>

<template>
  <div class="desktop">
    <Selector class="selector">
      <Shortcut
        class="shortcut"
        v-for="shortcut in shortcutsStore.shortcuts"
        :shortcut="shortcut"
        :key="shortcut.id"
        @click="handleShortcutClick(shortcut.name)"
        @double-click="handleShortcutDoubleClick(shortcut.name)"
      />
    </Selector>
  </div>
</template>

<style scoped>
.desktop {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
