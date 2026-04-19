<template>
  <div class="theme-switcher-container">
    <button @click="userSelection = 'auto'" :class="{ active: userSelection === 'auto' }">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-monitor"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    </button>
    <button @click="userSelection = 'light'" :class="{ active: userSelection === 'light' }">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-sun"
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    </button>
    <button @click="userSelection = 'dark'" :class="{ active: userSelection === 'dark' }">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-moon"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useColorMode, useStorage, type BasicColorSchema } from '@vueuse/core';
import { watch } from 'vue';

const userSelection = useStorage<BasicColorSchema>('vue-theme-selection', 'auto');
const colorMode = useColorMode();

watch(
  userSelection,
  (newSelection) => {
    colorMode.value = newSelection;
  },
  { immediate: true },
);
</script>

<style scoped>
.theme-switcher-container {
  display: flex;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 2px;
  background-color: var(--color-background-mute);
}

.theme-switcher-container button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  padding: 4px 8px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-switcher-container button:hover {
  color: var(--color-accent);
}

.theme-switcher-container button.active {
  background-color: var(--color-background);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.theme-switcher-container button svg {
  width: 16px;
  height: 16px;
}
</style>
