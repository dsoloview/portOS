<script setup lang="ts">
export interface InputProps {
  modelValue: string
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'url'
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  error?: string
  hint?: string
  autocomplete?: string
  maxlength?: number
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  required: false,
  disabled: false,
  readonly: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  input: [event: Event]
}>()

const inputId = `input-${Math.random().toString(36).substr(2, 9)}`
</script>

<template>
  <div class="base-input">
    <label v-if="label" :for="inputId" class="input-label">
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>

    <div class="input-wrapper" :class="{ 'has-error': error, disabled, readonly }">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :maxlength="maxlength"
        class="input-field"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value); emit('input', $event)"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />
    </div>

    <div v-if="error || hint" class="input-message">
      <span v-if="error" class="error-text">{{ error }}</span>
      <span v-else-if="hint" class="hint-text">{{ hint }}</span>
    </div>
  </div>
</template>

<style scoped>
.base-input {
  width: 100%;
}

.input-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #424242;
  cursor: pointer;
}

.required-mark {
  color: #d32f2f;
  margin-left: 0.25rem;
}

.input-wrapper {
  position: relative;
}

.input-field {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
  background: white;
}

.input-field:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
}

.input-field::placeholder {
  color: #9e9e9e;
}

.input-wrapper.has-error .input-field {
  border-color: #d32f2f;
}

.input-wrapper.has-error .input-field:focus {
  border-color: #d32f2f;
  box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.1);
}

.input-wrapper.disabled .input-field {
  background: #f5f5f5;
  color: #9e9e9e;
  cursor: not-allowed;
}

.input-wrapper.readonly .input-field {
  background: #fafafa;
  cursor: default;
}

.input-message {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  line-height: 1.4;
}

.error-text {
  color: #d32f2f;
}

.hint-text {
  color: #757575;
}

@media (max-width: 768px) {
  .input-field {
    font-size: 16px;
  }
}
</style>
