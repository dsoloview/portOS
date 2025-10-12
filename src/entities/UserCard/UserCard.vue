<script setup lang="ts">
import type { User } from '@/shared/types'
import { useUsersStore } from '@/shared/stores'

type Props = {
  user: User
}

const usersStore = useUsersStore()

const props = defineProps<Props>()

const handleDelete = () => {
  usersStore.removeUser(props.user.id)
}

const handleClick = () => {
  usersStore.setCurrentUser(props.user.id)
}
</script>

<template>
  <div class="user-card" @click="handleClick">
    <div class="user-avatar">
      <img :src="user.image" :alt="user.name" />
    </div>

    <div class="user-info">
      <h3 class="user-name">{{ user.name }}</h3>
      <p class="user-id">{{ user.id }}</p>
    </div>

    <button class="delete-btn" @click="handleDelete" aria-label="Удалить пользователя">
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  width: 100%;
  max-width: 320px;
  gap: 16px;
  cursor: pointer;
}

.user-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 500;
  color: #212121;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-id {
  margin: 0;
  font-size: 14px;
  color: #757575;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.delete-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: #757575;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.delete-btn:hover {
  background: rgba(244, 67, 54, 0.1);
  color: #f44336;
}

.delete-btn:active {
  background: rgba(244, 67, 54, 0.2);
}

.delete-btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.3);
}
</style>
