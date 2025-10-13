
<script setup lang="ts">
import { IconStack2 } from '@tabler/icons-vue'

interface Props {
  size?: number
  stroke?: number
  showTitle?: boolean
  titleSize?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  size: 48,
  stroke: 1.5,
  showTitle: false,
  titleSize: 'large'
})

const titleClasses = {
  small: 'logo-title-small',
  medium: 'logo-title-medium',
  large: 'logo-title-large'
}
</script>

<template>
  <div class="portos-logo">
    <div class="logo-icon">
      <IconStack2 :size="props.size" :stroke="props.stroke" />
    </div>
    <h1 v-if="props.showTitle" :class="['logo-title', titleClasses[props.titleSize]]">
      PortOS
    </h1>
  </div>
</template>

<style scoped>
.portos-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  opacity: 0.9;
  color: currentColor;
  transition: opacity 0.2s ease;
}

.logo-icon:hover {
  opacity: 1;
}

.logo-title {
  margin: 0;
  font-weight: 300;
  color: currentColor;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.logo-title-small {
  font-size: 1.5rem;
}

.logo-title-medium {
  font-size: 2rem;
}

.logo-title-large {
  font-size: 2.5rem;
}

@media (max-width: 768px) {
  .logo-title-large {
    font-size: 2rem;
  }

  .logo-title-medium {
    font-size: 1.75rem;
  }

  .logo-title-small {
    font-size: 1.25rem;
  }
}
</style>
