<script setup lang="ts">
import { UserCard } from '@/entities'
import { useUsersStore } from '@/shared/stores'

const usersStore = useUsersStore()
</script>

<template>
  <div class="user-card-list-container">
    <div class="user-card-list">
      <UserCard v-for="user in usersStore.users" :user="user" :key="user.id" />
    </div>
  </div>
</template>

<style scoped>
.user-card-list-container {
  position: relative;
}

.user-card-list {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 1rem;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}
</style>
