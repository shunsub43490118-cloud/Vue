<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  { id: 1, title: '機能 1', description: 'ビジネスの為の素晴らしい機能' },
  { id: 2, title: '機能 2', description: '高速で信頼できるサービス' },
  { id: 3, title: '機能 3', description: '24/7 カスタマーサポート' },
])
</script>

<template>
  <div class="home">
    <section class="hero">
      <h1>私たちのシンプルウェブサイトへようこそ</h1>
      <p>Vue と Vite で素晴らしいものを構築しましょう</p>
      <button class="cta-button">始める</button>
    </section>

    <section class="features">
      <h2>機能</h2>
      <div class="feature-grid">
        <div v-for="item in items" :key="item.id" class="feature-card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </section>

    <section class="showcase">
      <h2>なぜ私たちを選ぶのか？</h2>
      <ul class="benefits">
        <li>✓ 使いやすい</li>
        <li>✓ レスポンシブデザイン</li>
        <li>✓ 最新技術</li>
        <li>✓ 優れたサポート</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
}

.hero {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #369970;
}

.features {
  margin-bottom: 3rem;
}

.features h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.feature-card h3 {
  color: #42b983;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.showcase {
  background-color: #f8f9fa;
  padding: 3rem 2rem;
  border-radius: 8px;
}

.showcase h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.benefits {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.benefits li {
  font-size: 1.1rem;
  color: #2c3e50;
  padding: 1rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 1.8rem;
  }

  .hero p {
    font-size: 1rem;
  }
}
</style>
