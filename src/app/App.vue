<script setup lang="ts">
import { Login, OS } from '@/pages'
import { useUsersStore } from '@/shared/stores'

const usersStore = useUsersStore()
</script>

<template>
  <OS v-if="usersStore.currentUser" />
  <Login v-else />
</template>

<style scoped></style>
