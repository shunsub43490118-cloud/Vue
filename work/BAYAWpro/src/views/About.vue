<template>
  <div class="about">
    <h1>私たちについて</h1>
    
    <section class="content">
      <h2>私たちのストーリー</h2>
      <p>
        私たちは顧客に対して高品質なソリューションの提供に専念している企業です。
        長年の経験と情熱的なプロフェッショナルなチームを備えて、業界で最高のサービスを提供するよう努めています。
      </p>
    </section>

    <section class="content">
      <h2>私たちのミッション</h2>
      <p>
        私たちのミッションは、ビジネスがデジタルの世界で成功するのに役立つ革新的で信頼できるサービスを提供することです。
        品質、透明性、顧客満足度を重視しています。
      </p>
    </section>

    <section class="content">
      <h2>私たちのチーム</h2>
      <div class="team-grid">
        <div class="team-member">
          <div class="avatar">JD</div>
          <h3>John Doe</h3>
          <p>CEO・創立者</p>
        </div>
        <div class="team-member">
          <div class="avatar">JS</div>
          <h3>Jane Smith</h3>
          <p>リードデベロッパー</p>
        </div>
        <div class="team-member">
          <div class="avatar">MB</div>
          <h3>Michael Brown</h3>
          <p>デザイナー</p>
        </div>
      </div>
    </section>

    <section class="content">
      <h2>なぜ私たちを選ぶのか？</h2>
      <ul class="reasons">
        <li><strong>経験:</strong> 業界での10年以上の経験</li>
        <li><strong>品質:</strong> 品質に妥協しません</li>
        <li><strong>サポート:</strong> 常にお力になります</li>
        <li><strong>革新:</strong> サービスを継続的に向上させています</li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
}

.about h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.content {
  margin-bottom: 3rem;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.content h2 {
  color: #42b983;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.content p {
  color: #555;
  line-height: 1.8;
  font-size: 1.1rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.team-member {
  text-align: center;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 1rem;
}

.team-member h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.team-member p {
  color: #999;
  font-size: 0.9rem;
}

.reasons {
  list-style: none;
  background-color: white;
  padding: 0;
}

.reasons li {
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  color: #555;
}

.reasons li:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .about h1 {
    font-size: 1.8rem;
  }

  .content {
    padding: 1.5rem;
  }
}
</style>
