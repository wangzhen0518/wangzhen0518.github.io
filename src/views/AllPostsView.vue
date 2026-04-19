<template>
  <div>
    <h1>All Posts</h1>
    <PostList :posts="posts" />
  </div>
</template>

<script setup lang="ts">
import PostList from '../components/PostList.vue';
import { usePosts } from '../composables/usePosts';

const { posts } = usePosts();
</script>
