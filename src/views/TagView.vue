<template>
  <div>
    <h1>Posts tagged with "{{ tag }}"</h1>
    <PostList :posts="taggedPosts" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { usePosts } from '../composables/usePosts';
import { computed } from 'vue';
import PostList from '../components/PostList.vue';

const route = useRoute();
const { posts } = usePosts();
const tag = route.params.tag as string;

const taggedPosts = computed(() => {
  return posts.value.filter((post) => post.tags.includes(tag));
});
</script>
