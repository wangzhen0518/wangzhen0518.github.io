<template>
  <div class="post-list">
    <PostListItem v-for="post in posts" :key="post.path" :post="post" />
  </div>
</template>

<script setup lang="ts">
import PostListItem from './PostListItem.vue';
import type { Post } from '../composables/usePosts';

defineProps<{ posts: Post[] }>();
</script>
