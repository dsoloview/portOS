<script setup lang="ts">

import { useUsersStore } from '@/shared/stores'

const usersStore = useUsersStore()

</script>

<template>
  <main class="os-container">
    {{ usersStore.currentUser!.name }}
    <button @click="usersStore.logout">Logout</button>
  </main>
</template>

<style scoped>
.os-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
}
</style>
