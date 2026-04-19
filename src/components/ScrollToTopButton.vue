<template>
  <transition name="fade">
    <button v-if="isVisible" @click="scrollToTop" class="scroll-to-top-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        fill="none"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  </transition>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useScroll } from '@vueuse/core';

const { y: scrollY } = useScroll(window);
const isVisible = ref(false);

watchEffect(() => {
  isVisible.value = scrollY.value > 200;
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'instant',
  });
}
</script>

<style scoped>
.scroll-to-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 50;
  background-color: var(--color-background-soft);
  color: var(--color-accent); /* For SVG fill="currentColor" */
  border: 1px solid var(--color-border);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  /* font-size: 1.5rem; Removed as using SVG */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s;
}

.scroll-to-top-btn:hover {
  opacity: 0.8;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
