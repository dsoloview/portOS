
<script setup lang="ts">
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
  fullWidth: false,
})

defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'base-button',
      `variant-${variant}`,
      `size-${size}`,
      { 'full-width': fullWidth, loading }
    ]"
    @click="$emit('click')"
  >
    <span class="button-content">
      <slot name="icon" />
      <slot />
    </span>
    <div v-if="loading" class="loading-spinner" />
  </button>
</template>

<style scoped>
.base-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-sizing: border-box;
}

.base-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.base-button:focus {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.size-sm {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
}

.size-md {
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
}

.size-lg {
  padding: 1rem 2rem;
  font-size: 1rem;
}

.variant-primary {
  background: #1976d2;
  color: white;
}

.variant-primary:hover:not(:disabled) {
  background: #1565c0;
  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.3);
}

.variant-secondary {
  background: #f5f5f5;
  color: #424242;
  border: 1px solid #e0e0e0;
}

.variant-secondary:hover:not(:disabled) {
  background: #eeeeee;
  border-color: #bdbdbd;
}

.variant-ghost {
  background: transparent;
  color: #757575;
}

.variant-ghost:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.04);
}

.variant-danger {
  background: #d32f2f;
  color: white;
}

.variant-danger:hover:not(:disabled) {
  background: #c62828;
  box-shadow: 0 4px 16px rgba(211, 47, 47, 0.3);
}

.full-width {
  width: 100%;
}

.button-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.loading .button-content {
  opacity: 0.7;
}

.loading-spinner {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .base-button {
    min-height: 44px;
  }
}
</style>
