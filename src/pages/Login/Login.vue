<script setup lang="ts">
import { CreateUserForm, UserCardList } from '@/widgets'
import { IconStack2 } from '@tabler/icons-vue'
</script>

<template>
  <main class="login-page">
    <div class="background-gradient"></div>

    <div class="login-container">
      <div class="os-header">
        <div class="os-logo">
          <IconStack2 :size="48" stroke="1.5" />
        </div>
        <h1 class="os-title">PortOS</h1>
        <p class="os-subtitle">Выберите пользователя для входа в систему</p>
      </div>

      <div class="users-section">
        <UserCardList />
      </div>

      <div class="create-user-section">
        <CreateUserForm />
      </div>
    </div>

    <div class="login-footer">
      <p>© 2025 PortOS.</p>
    </div>
  </main>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.background-gradient {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: -1;
}

.login-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 3rem;
}

.os-header {
  text-align: center;
  color: white;
  margin-bottom: 1rem;
}

.os-logo {
  margin-bottom: 1rem;
  opacity: 0.9;
}

.os-title {
  font-size: 2.5rem;
  font-weight: 300;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.os-subtitle {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
  font-weight: 400;
}

.users-section {
  width: 100%;
  max-width: 1000px;
}

.create-user-section {
  width: 100%;
  max-width: 400px;
}

.login-footer {
  text-align: center;
  padding: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
}

.login-footer p {
  margin: 0;
}

@media (max-width: 768px) {
  .login-container {
    padding: 1rem;
    gap: 2rem;
  }

  .os-title {
    font-size: 2rem;
  }
}
</style>
