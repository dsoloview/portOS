<script setup lang="ts">
import { Shortcut } from '@/entities'
import { useShortcutsStore } from '@/entities'
import { onMounted, onUnmounted, ref } from 'vue'
import { useDesktopSizeStore, useUsersStore } from '@/shared/stores'
import { Selector } from '@/features/Selector'
import { Window } from '@/entities/Window'
import { Windows } from '@/features/Windows'

const desktopEl = ref<HTMLDivElement | null>(null)
const shortcutsStore = useShortcutsStore()
const usersStore = useUsersStore()
const desktopSizeStore = useDesktopSizeStore()

onMounted(async () => {
  desktopSizeStore.setDesktopSize(
    desktopEl.value?.clientHeight ?? 0,
    desktopEl.value?.clientWidth ?? 0
  )

  await shortcutsStore.addShortcut({
    id: crypto.randomUUID(),
    userId: usersStore!.currentUser!.id,
    icon: '📁',
    name: 'Picture',
    selected: false,
    coordinate: { x: 0, y: 0 },
  })
  await shortcutsStore.loadShortcuts()

  window.addEventListener('resize', resizeDesktop);
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeDesktop);
})

const resizeDesktop = () => {
  desktopSizeStore.setDesktopSize(
    desktopEl.value?.clientHeight ?? 0,
    desktopEl.value?.clientWidth ?? 0
  )
}

const handleShortcutClick = (name: string) => {
  console.log(`Clicked on ${name}`)
}

const handleShortcutDoubleClick = (name: string) => {
  console.log(`Double clicked on ${name}`)
}
</script>

<template>
  <div class="desktop" ref="desktopEl">
    <Windows />
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
