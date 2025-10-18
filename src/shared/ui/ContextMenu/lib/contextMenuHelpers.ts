
import type { ContextMenuItem } from '../model/types'

/**
 * Создает разделитель для контекстного меню
 */
export const createSeparator = (id: string): ContextMenuItem => ({
  id,
  label: '',
  separator: true
})

/**
 * Создает элемент меню с базовыми параметрами
 */
export const createMenuItem = (
  id: string,
  label: string,
  onClick?: () => void,
  options?: Partial<Pick<ContextMenuItem, 'icon' | 'disabled' | 'shortcut'>>
): ContextMenuItem => ({
  id,
  label,
  onClick,
  ...options
})

/**
 * Создает подменю
 */
export const createSubmenu = (
  id: string,
  label: string,
  children: ContextMenuItem[],
  options?: Partial<Pick<ContextMenuItem, 'icon' | 'disabled'>>
): ContextMenuItem => ({
  id,
  label,
  children,
  ...options
})

/**
 * Фильтрует видимые элементы меню
 */
export const filterVisibleItems = (items: ContextMenuItem[]): ContextMenuItem[] => {
  return items.filter(item => !item.disabled)
}

/**
 * Проверяет, есть ли в меню активные элементы
 */
export const hasActiveItems = (items: ContextMenuItem[]): boolean => {
  return items.some(item => !item.disabled && !item.separator)
}
