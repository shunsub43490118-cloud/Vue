<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="nav-brand">
        <h1>OCR 属性抽出システム</h1>
      </div>
      <ul class="nav-links">
        <li><router-link to="/overview" :class="{ active: $route.path === '/overview' }">紹介</router-link></li>
        <li><router-link to="/rule-settings" :class="{ active: $route.path === '/rule-settings' }">属性設定</router-link></li>
        <li><router-link to="/document-extract" :class="{ active: $route.path === '/document-extract' }">抽出実行</router-link></li>
      </ul>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
    <footer class="footer">
      <p>&copy; 2026 OCR 属性抽出システム. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.navbar {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-brand h1 {
  font-size: 1.8rem;
  color: #42b983;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
  border-bottom: 2px solid transparent;
}

.nav-links a:hover,
.nav-links a.active {
  color: #42b983;
  border-bottom-color: #42b983;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 2rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .nav-brand h1 {
    font-size: 1.5rem;
  }
}
</style>
