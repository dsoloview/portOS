<script setup lang="ts">
import { useUsersStore } from '@/shared/stores'
import { ref } from 'vue'

const usersStore = useUsersStore()

const newUserName = ref<string>()

const login = () => {
  const user = usersStore.addUser({
    name: newUserName.value!,
    image: 'https://picsum.photos/200/300'
  })
  usersStore.setCurrentUser(user.id)
}
</script>

<template>
  <form @submit.prevent="login">
    <input name="userName" type="text" placeholder="Username" v-model="newUserName" />
  </form>
</template>

<style scoped></style>
