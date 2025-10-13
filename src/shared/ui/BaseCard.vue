<script setup lang="ts">
export interface CardProps {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  rounded?: 'none' | 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<CardProps>(), {
  padding: 'md',
  shadow: 'md',
  rounded: 'md',
})
</script>

<template>
  <div
    class="base-card"
    :class="[
      `padding-${padding}`,
      `shadow-${shadow}`,
      `rounded-${rounded}`
    ]"
  >
    <slot />
  </div>
</template>

<style scoped>
.base-card {
  background: white;
  transition: all 0.3s ease;
}

.padding-none {
  padding: 0;
}

.padding-sm {
  padding: 0.75rem;
}

.padding-md {
  padding: 1.5rem;
}

.padding-lg {
  padding: 2rem;
}

.shadow-none {
  box-shadow: none;
}

.shadow-sm {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.shadow-md {
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
}

.shadow-lg {
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
}

.rounded-none {
  border-radius: 0;
}

.rounded-sm {
  border-radius: 4px;
}

.rounded-md {
  border-radius: 16px;
}

.rounded-lg {
  border-radius: 24px;
}
</style>
