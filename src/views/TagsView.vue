<template>
  <div>
    <h1>Tags</h1>
    <ul class="tag-list">
      <li v-for="tag in tags" :key="tag">
        <router-link :to="`/tags/${tag}`" class="tag-link">{{ tag }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTags } from '../composables/useTags';

const { tags } = useTags();
</script>

<style scoped>
.tag-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
