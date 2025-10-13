<script setup lang="ts">
import { Loader, Login, OS } from '@/pages'
import { useUsersStore } from '@/shared/stores'

const usersStore = useUsersStore()
</script>

<template>
  <Loader />
  <OS v-if="usersStore.currentUser" />
  <Login v-else />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


</style>
