<template>
  <div>
    <PostList :posts="posts" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, ref } from 'vue';

import PostList from '../components/PostList.vue';
import { usePosts } from '../composables/usePosts';

const { posts } = usePosts();

const renderStartTime = ref(0);
const isInitialRender = ref(true);

onMounted(() => {
  // This marks the time when the component is mounted but data might not be ready yet
  renderStartTime.value = performance.now();
});

onUpdated(() => {
  // This runs after the DOM is updated due to data changes
  if (isInitialRender.value && posts.value.length > 0) {
    const renderEndTime = performance.now();
    const renderTime = renderEndTime - renderStartTime.value;
    console.log(`Posts List Rendering Time: ${renderTime.toFixed(2)} ms`);
    isInitialRender.value = false; // Ensure this only runs once
  }
});
</script>
