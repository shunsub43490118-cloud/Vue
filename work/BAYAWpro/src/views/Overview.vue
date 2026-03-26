<script setup lang="ts">
</script>

<template>
  <div class="overview">
    <section class="hero">
      <h1>帳票属性抽出システム</h1>
      <p>OCR と AI を活用した帳票データの自動抽出ツール</p>
    </section>

    <section class="features">
      <h2>主な機能</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon">📋</div>
          <h3>柔軟な属性設定</h3>
          <p>プリセットまたはカスタムモードで、抽出する属性を自由に設定できます。</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🖼️</div>
          <h3>画像アップロード</h3>
          <p>帳票画像をアップロードして、自動的に必要な情報を抽出します。</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>リアルタイム表示</h3>
          <p>抽出結果を見やすく可視化して、画像上に座標と共に表示します。</p>
        </div>
      </div>
    </section>

    <section class="how-it-works">
      <h2>使い方</h2>
      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <h3>属性を設定</h3>
          <p>「属性設定」ページで、抽出したい項目を選択またはカスタム定義します。</p>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <h3>画像をアップロード</h3>
          <p>「抽出実行」ページで帳票画像をアップロードします。</p>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <h3>結果を確認</h3>
          <p>抽出された属性と値をリアルタイムで確認できます。</p>
        </div>
      </div>
    </section>

    <section class="cta">
      <h2>今すぐ始める</h2>
      <router-link to="/rule-settings" class="cta-button">属性を設定する</router-link>
    </section>
  </div>
</template>

<style scoped>
.overview {
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
  opacity: 0.9;
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
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #42b983;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.how-it-works {
  background-color: #f8f9fa;
  padding: 3rem 2rem;
  border-radius: 8px;
  margin-bottom: 3rem;
}

.how-it-works h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.step {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.step-number {
  position: absolute;
  top: -15px;
  left: 20px;
  background-color: #42b983;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.step h3 {
  color: #2c3e50;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.step p {
  color: #666;
  line-height: 1.6;
}

.cta {
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
}

.cta h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.cta-button {
  display: inline-block;
  background-color: #42b983;
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #369970;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 1.8rem;
  }

  .hero p {
    font-size: 1rem;
  }

  .features h2,
  .how-it-works h2 {
    font-size: 1.5rem;
  }
}
</style>
