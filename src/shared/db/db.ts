import Dexie from 'dexie'
import type { Table } from 'dexie'

export interface ShortcutEntity {
  id: string
  userId: string
  name: string
  icon: string
  coordinate: { x: number; y: number }
  selected: boolean
  createdAt: Date
  updatedAt: Date
}

export class PortOSDatabase extends Dexie {
  shortcuts!: Table<ShortcutEntity>

  constructor() {
    super('PortOSDatabase')
    this.version(1).stores({
      shortcuts: 'id, userId, name, icon, createdAt, updatedAt',
    })
  }
}

export const portOsDatabase = new PortOSDatabase()
