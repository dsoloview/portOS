import { defineStore } from 'pinia'
import { ref } from 'vue'

type User = {
  id: string
  name: string
  image: string
}

type UserWithOptionalId = Omit<User, 'id'> & { id?: string }

const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>(
    localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')!) : [],
  )
  const currentUser = ref<User | undefined>(
    localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : undefined,
  )

  const addUser = (user: UserWithOptionalId): User => {
    if (!user.id) {
      user.id = crypto.randomUUID()
    }
    users.value.push(user as User)
    localStorage.setItem('users', JSON.stringify(users.value))

    return user as User
  }

  const removeUser = (userId: string) => {
    users.value = users.value.filter((user) => user.id !== userId)
    localStorage.setItem('users', JSON.stringify(users.value))
  }

  const setCurrentUser = (userId: string) => {
    currentUser.value = users.value.find((user) => user.id === userId)
    localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
  }

  const logout = () => {
    currentUser.value = undefined
    localStorage.removeItem('currentUser')
  }

  const clearUsers = () => {
    users.value = []
    localStorage.removeItem('users')
  }

  return {
    users,
    currentUser,
    addUser,
    removeUser,
    setCurrentUser,
    clearUsers,
    logout
  }
})

export default useUsersStore
