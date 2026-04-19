<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useColorMode } from '@vueuse/core';

import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import ScrollToTopButton from './components/ScrollToTopButton.vue';

useColorMode();
</script>

<template>
  <AppHeader />
  <main class="container" style="margin-top: 2rem">
    <RouterView />
  </main>
  <AppFooter />
  <ScrollToTopButton />
</template>
