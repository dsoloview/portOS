<script setup lang="ts">
import { useUsersStore } from '@/shared/stores'
import { ref } from 'vue'

const usersStore = useUsersStore()

const newUserName = ref<string>('')
const showCreateForm = ref<boolean>(false)

const handleCreateUser = () => {
  if (newUserName.value.trim()) {
    usersStore.addUser({
      name: newUserName.value.trim(),
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(newUserName.value)}&background=1976d2&color=fff&size=200`,
    })
    newUserName.value = ''
    showCreateForm.value = false
  }
}

const toggleCreateForm = () => {
  showCreateForm.value = !showCreateForm.value
  if (!showCreateForm.value) {
    newUserName.value = ''
  }
}
</script>

<template>
  <div class="create-user-container">
    <button
      @click="toggleCreateForm"
      class="add-user-btn"
      :class="{ 'form-active': showCreateForm }"
    >
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
      </svg>
      Create new user
    </button>

    <div class="form-space" :class="{ expanded: showCreateForm }">
      <div class="form-wrapper" :class="{ visible: showCreateForm }">
        <div class="create-form">
          <div class="form-header">
            <h3>New user</h3>
            <button @click="toggleCreateForm" class="close-btn">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                />
              </svg>
            </button>
          </div>

          <form @submit.prevent="handleCreateUser" class="user-form">
            <div class="input-group">
              <label for="userName">Username</label>
              <input
                id="userName"
                v-model="newUserName"
                type="text"
                placeholder="Enter username"
                required
                autocomplete="username"
              />
            </div>

            <div class="form-actions">
              <button type="button" @click="toggleCreateForm" class="cancel-btn">Cancel</button>
              <button type="submit" class="create-btn" :disabled="!newUserName.trim()">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-user-container {
  width: 100%;
}

.add-user-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  margin-bottom: 1rem;
}

.add-user-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.5);
}

.add-user-btn:focus {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 4px;
}

.add-user-btn.form-active {
  opacity: 0.5;
  pointer-events: none;
}

.form-space {
  height: 0;
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.form-space.expanded {
  height: 250px;
}

.form-wrapper {
  opacity: 0;
  transform: scaleY(0) translateY(-10px);
  transform-origin: center top;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  align-items: center;
}

.form-wrapper.visible {
  opacity: 1;
  transform: scaleY(1) translateY(0);
}

.create-form {
  width: 100%;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
}

.form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.form-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
  color: #212121;
}

.close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #757575;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.04);
  transform: scale(1.05);
}

.close-btn:focus {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #424242;
}

.input-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.input-group input:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.cancel-btn,
.create-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cancel-btn {
  background: transparent;
  color: #757575;
}

.cancel-btn:hover {
  background: rgba(0, 0, 0, 0.04);
}

.cancel-btn:focus {
  outline: 2px solid #757575;
  outline-offset: 2px;
}

.create-btn {
  background: #1976d2;
  color: white;
}

.create-btn:hover:not(:disabled) {
  background: #1565c0;
  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.3);
}

.create-btn:focus:not(:disabled) {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}

.create-btn:disabled {
  background: #bdbdbd;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .create-form {
    padding: 1rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .cancel-btn,
  .create-btn {
    width: 100%;
  }

  .form-space.expanded {
    height: 280px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .form-space,
  .form-wrapper {
    transition-duration: 0.15s;
  }
}
</style>
