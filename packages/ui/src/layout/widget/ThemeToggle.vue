<script setup lang="ts">
import { computed, ref } from 'vue'
import { UIIconButton } from '#/components/button'

const isDark = ref(true)

const theme = computed(() => (isDark.value ? 'light' : 'dark'))

function toggleTheme() {
  isDark.value = !isDark.value
}
</script>

<template>
  <UIIconButton
    :aria-label="theme"
    :class="[`is-${theme}`]"
    aria-live="polite"
    class="theme-toggle rounded-full"
    @click="toggleTheme"
  >
    <svg aria-hidden="true" height="24" viewBox="0 0 24 24" width="24">
      <mask
        id="theme-toggle-moon"
        class="theme-toggle__moon"
        fill="hsl(var(--foreground)/80%)"
        stroke="none"
      >
        <rect fill="white" height="100%" width="100%" x="0" y="0" />
        <circle cx="40" cy="8" fill="black" r="11" />
      </mask>
      <circle
        id="sun"
        class="theme-toggle__sun"
        cx="12"
        cy="12"
        mask="url(#theme-toggle-moon)"
        r="11"
      />
      <g class="theme-toggle__sun-beams">
        <line x1="12" x2="12" y1="1" y2="3" />
        <line x1="12" x2="12" y1="21" y2="23" />
        <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
        <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
        <line x1="1" x2="3" y1="12" y2="12" />
        <line x1="21" x2="23" y1="12" y2="12" />
        <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
        <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
      </g>
    </svg>
  </UIIconButton>
</template>

<style scoped>
.theme-toggle {
  .theme-toggle__moon {
    circle {
      transition: transform 0.5s cubic-bezier(0, 0, 0.3, 1);
    }
  }

  .theme-toggle__sun {
    @apply fill-foreground/90 stroke-none;

    transition: transform 1.6s cubic-bezier(0.25, 0, 0.2, 1);
    transform-origin: center center;
  }

  .theme-toggle__sun-beams {
    @apply stroke-foreground/90 stroke-[2px];

    transition:
      transform 1.6s cubic-bezier(0.5, 1.5, 0.75, 1.25),
      opacity 0.6s cubic-bezier(0.25, 0, 0.3, 1);
    transform-origin: center center;
  }

  &.is-light {
    .theme-toggle__sun {
      @apply scale-50;
    }

    .theme-toggle__sun-beams {
      transform: rotateZ(0.25turn);
    }
  }

  &.is-dark {
    .theme-toggle__moon {
      & > circle {
        transform: translateX(-20px);
      }
    }

    .theme-toggle__sun-beams {
      @apply opacity-0;
    }
  }

  &:hover > svg {
    .theme-toggle__sun,
    .theme-toggle__moon {
      @apply fill-foreground;
    }
  }
}
</style>
