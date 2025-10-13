<script setup lang="ts">
import { useUsersStore } from '@/shared/stores'
import { ref, onMounted, onUnmounted } from 'vue'
import { BaseButton } from '@/shared/ui'
import { IconPlus } from '@tabler/icons-vue'

const usersStore = useUsersStore()

const newUserName = ref<string>('')
const showCreateForm = ref<boolean>(false)
const containerRef = ref<HTMLElement>()

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

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    if (showCreateForm.value) {
      showCreateForm.value = false
      newUserName.value = ''
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="containerRef" class="create-user-container">
    <div class="expandable-form">
      <div class="button-state" :class="{ hidden: showCreateForm }">
        <BaseButton
          variant="ghost"
          size="lg"
          :full-width="true"
          @click="toggleCreateForm"
          class="add-user-btn"
        >
          <template #icon>
            <IconPlus size="24" />
          </template>
          Create new user
        </BaseButton>
      </div>

      <div class="form-state" :class="{ visible: showCreateForm }">
        <form @submit.prevent="handleCreateUser" class="user-form">
          <div class="input-wrapper">
            <input
              v-model="newUserName"
              placeholder="Enter username"
              class="form-input"
              autocomplete="username"
              required
            />
            <BaseButton
              variant="ghost"
              size="sm"
              type="submit"
              :disabled="!newUserName.trim()"
              class="create-btn"
            >
              Create
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-user-container {
  width: 100%;
}

.expandable-form {
  position: relative;
  width: 100%;
  height: 72px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.button-state {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.button-state.hidden {
  opacity: 0;
  pointer-events: none;
}

.add-user-btn {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  background: transparent !important;
  border: none !important;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
  transform-origin: center center;
  will-change: transform, background;
}

.add-user-btn:hover {
  background: rgba(255, 255, 255, 0.05) !important;
  transform: scale(1.015);
}

.add-user-btn:focus {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 4px;
}

.form-state {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
  opacity: 0;
  transform: scale(0.9) translateY(5px);
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
  transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  display: flex;
  align-items: center;
}

.form-state.visible {
  opacity: 0.99;
  transform: scale(1) translateY(0);
  pointer-events: auto;
}

.user-form {
  width: 100%;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.form-input {
  width: 100%;
  padding: 0.75rem 5.5rem 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.08);
}

.form-input:focus::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.create-btn {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem 0.875rem !important;
  font-size: 0.875rem;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 6px !important;
  background: rgba(255, 255, 255, 0.08) !important;
  color: rgba(255, 255, 255, 0.9) !important;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  min-width: 65px;
  height: auto !important;
}

.create-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: rgba(255, 255, 255, 0.25) !important;
  color: white !important;
  transform: translateY(-50%) scale(1.02) !important;
}

.create-btn:focus {
  outline: none !important;
  border-color: rgba(255, 255, 255, 0.4) !important;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1) !important;
}

.create-btn:disabled {
  opacity: 0.4 !important;
  cursor: not-allowed !important;
}

@media (max-width: 768px) {
  .form-input {
    padding-right: 5rem;
  }

  .create-btn {
    min-width: 60px;
    font-size: 0.8rem;
    padding: 0.4rem 0.75rem !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .button-state,
  .form-state {
    transition-duration: 0.15s;
  }
}
</style>
