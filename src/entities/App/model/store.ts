import { defineStore } from 'pinia'
import type { App } from '@/entities/App'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const apps = ref<App[]>([
    { id: '1', name: 'Firefox', executable: 'firefox', category: 'internet' },
    { id: '2', name: 'Kate', executable: 'kate', category: 'editors' },
    { id: '3', name: 'Dolphin', executable: 'dolphin', category: 'system' },
    { id: '4', name: 'Konsole', executable: 'konsole', category: 'system' },
    { id: '5', name: 'LibreOffice Writer', executable: 'libreoffice', category: 'office' }
  ]);

  return {
    apps
  }
})
