<template>
  <header class="app-header">
    <div class="container">
      <nav class="nav">
        <router-link to="/" class="nav-logo">Zhen Wang</router-link>
        <ul class="nav-links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/posts">All Posts</router-link></li>
          <li><router-link to="/tags">Tags</router-link></li>
        </ul>
        <!-- TODO move search into a separate component -->
        <div class="search-container">
          <form @submit.prevent="search" class="search-form">
            <input
              type="search"
              v-model="searchQuery"
              placeholder="Search..."
              class="search-input"
              ref="searchInput"
            />
            <button type="submit" class="search-toggle-button">
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
                class="feather feather-search"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>
        <ThemeSwitcher />
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeSwitcher from './ThemeSwitcher.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

function search() {
  if (searchQuery.value.trim()) {
    router.push({ name: 'search', query: { q: searchQuery.value } });
  }
}
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: var(--color-background);
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--color-heading);
  cursor: pointer;
}

.nav-logo:hover {
  color: var(--color-accent);
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
}

.nav-links a:hover {
  color: var(--color-accent);
}

.nav-links a.router-link-exact-active {
  color: var(--color-accent);
}

.search-container {
  display: flex;
  align-items: center;
}

.search-form {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  background-color: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border-radius: 20px;
  width: 200px;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.search-input:focus {
  border-color: var(--color-accent);
  outline: none;
}

.search-toggle-button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  display: flex;
  align-items: center;
  padding: 0;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}

.search-toggle-button:hover {
  color: var(--color-accent);
}
</style>
