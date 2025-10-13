<script setup lang="ts">
import { UserCard } from '@/entities'
import { useUsersStore } from '@/shared/stores'

const usersStore = useUsersStore()
</script>


<template>
  <div class="user-card-list-container">
    <div class="user-card-list">
      <TransitionGroup name="user-card" tag="div" class="user-card-wrapper">
        <UserCard v-for="user in usersStore.users" :user="user" :key="user.id" />
      </TransitionGroup>
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

.user-card-wrapper {
  display: flex;
  gap: 1.5rem;
}

.user-card-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.user-card-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.user-card-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(-20px);
}

.user-card-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.user-card-move {
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.user-card-leave-active {
  position: absolute !important;
  z-index: -1;
}
</style>
