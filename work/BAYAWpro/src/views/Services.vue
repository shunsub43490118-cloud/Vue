<script setup lang="ts">
import { ref } from 'vue'

const services = ref([
  {
    id: 1,
    name: 'ウェブ開発',
    description: 'あなたのビジネス必要に合わせたカスタムウェブソリューション',
    price: '¥200,000',
    icon: '🖥️'
  },
  {
    id: 2,
    name: 'モバイルアプリ開発',
    description: 'ネイティブおよびクロスプラットフォームモバイルアプリケーション',
    price: '¥300,000',
    icon: '📱'
  },
  {
    id: 3,
    name: 'UI/UXデザイン',
    description: '美しくユーザーフレンドリーなインターフェースデザイン',
    price: '¥150,000',
    icon: '🎨'
  },
  {
    id: 4,
    name: 'コンサルティング',
    description: 'デジタル変革に関する専門家アドバイス',
    price: '¥100,000/時',
    icon: '💡'
  },
  {
    id: 5,
    name: 'メンテナンスサポート',
    description: 'アプリケーションがスムーズに実行し続ける',
    price: '¥50,000/月',
    icon: '🔧'
  },
  {
    id: 6,
    name: 'クラウドソリューション',
    description: 'スケーラブルなクラウドインフラストラクチャとデプロイメント',
    price: '¥250,000',
    icon: '☁️'
  },
])
</script>

<template>
  <div class="services">
    <h1>私たちのサービス</h1>
    <p class="subtitle">ビジネスの成長を支援するための幅広いプロフェッショナルサービスを提供しています</p>
    
    <div class="services-grid">
      <div v-for="service in services" :key="service.id" class="service-card">
        <div class="service-icon">{{ service.icon }}</div>
        <h3>{{ service.name }}</h3>
        <p>{{ service.description }}</p>
        <div class="service-footer">
          <span class="price">{{ service.price }}</span>
          <button class="learn-more">詳しく見る</button>
        </div>
      </div>
    </div>

    <section class="cta-section">
      <h2>準備はいいですか？</h2>
      <p>今日、プロジェクト要件について相談するお問い合わせください</p>
      <router-link to="/contact" class="cta-button">お問い合わせ</router-link>
    </section>
  </div>
</template>

<style scoped>
.services {
  width: 100%;
}

.services h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1rem;
}

.subtitle {
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.service-card {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  border-color: #42b983;
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.service-card h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.service-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.service-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.price {
  font-weight: bold;
  color: #42b983;
  font-size: 1.2rem;
}

.learn-more {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.learn-more:hover {
  background-color: #369970;
}

.cta-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem;
  border-radius: 8px;
  text-align: center;
}

.cta-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  display: inline-block;
  background-color: #42b983;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #369970;
}

@media (max-width: 768px) {
  .services h1 {
    font-size: 1.8rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .cta-section {
    padding: 2rem;
  }
}
</style>
