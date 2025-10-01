<template>
  <div class="loading-spinner-container">
    <div class="loading-spinner" :class="size">
      <div class="spinner-ring outer-ring"></div>
      <div class="spinner-ring middle-ring"></div>
      <div class="spinner-ring inner-ring"></div>
    </div>
    <p v-if="showText" class="loading-text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue';

interface LoadingSpinnerProps {
  /** Text to display below the spinner */
  text?: string;
  /** Whether to show the loading text */
  showText?: boolean;
  /** Size of the spinner (small, medium, large) */
  size?: 'small' | 'medium' | 'large';
}

withDefaults(defineProps<LoadingSpinnerProps>(), {
  text: 'Loading...',
  showText: true,
  size: 'medium'
});
</script>

<style lang="scss" scoped>
.loading-spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.loading-spinner {
  position: relative;
  display: inline-block;

  &.small {
    width: 60px;
    height: 60px;
  }

  &.medium {
    width: 100px;
    height: 100px;
  }

  &.large {
    width: 160px;
    height: 160px;
  }
}

.spinner-ring {
  position: absolute;
  border-radius: 50%;
  border-style: solid;
  border-color: transparent;
  animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);

  // Outer ring (largest, slowest, counter-clockwise)
  &.outer-ring {
    width: 100%;
    height: 100%;
    border-width: 3px;
    border-top-color: var(--color-border);
    border-right-color: var(--color-border);
    animation: spin-counter-clockwise 2.5s linear infinite;
  }

  // Middle ring (medium size, medium speed, clockwise)
  &.middle-ring {
    width: 75%;
    height: 75%;
    top: 12.5%;
    left: 12.5%;
    border-width: 2px;
    border-top-color: var(--color-text);
    border-right-color: var(--color-text);
    animation: spin-clockwise 1.8s linear infinite;
  }

  // Inner ring (smallest, fastest, counter-clockwise)
  &.inner-ring {
    width: 50%;
    height: 50%;
    top: 25%;
    left: 25%;
    border-width: 2px;
    border-top-color: #4f8cee;
    border-right-color: #4f8cee;
    animation: spin-counter-clockwise 1.2s linear infinite;
  }
}

.loading-text {
  margin-top: 15px;
  font-size: 0.9em;
  color: var(--color-text);
  opacity: 0.8;
  font-weight: 500;
}

// Animations
@keyframes spin-clockwise {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin-counter-clockwise {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

// Size variants
.loading-spinner {
  &.small {
    .spinner-ring {
      &.outer-ring {
        border-width: 2px;
      }
      &.middle-ring,
      &.inner-ring {
        border-width: 1px;
      }
    }
  }

  &.large {
    .spinner-ring {
      &.outer-ring {
        border-width: 4px;
      }
      &.middle-ring {
        border-width: 3px;
      }
      &.inner-ring {
        border-width: 3px;
      }
    }
  }
}

// Responsive adjustments
@media (max-width: 800px) {
  .loading-spinner-container {
    padding: 15px;
  }

  .loading-text {
    font-size: 0.85em;
  }
}
</style>
