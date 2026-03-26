<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  message: '',
})

const submitted = ref(false)

const handleSubmit = () => {
  if (formData.value.name && formData.value.email && formData.value.message) {
    submitted.value = true
    // Reset form after 3 seconds
    setTimeout(() => {
      formData.value = { name: '', email: '', message: '' }
      submitted.value = false
    }, 3000)
  }
}
</script>

<template>
  <div class="contact">
    <h1>お問い合わせ</h1>
    
    <div class="contact-container">
      <section class="contact-info">
        <h2>お気軽にご連絡ください</h2>
        <div class="info-item">
          <h3>📍 住所</h3>
          <p>〒100-0001<br>東京都千代田区丸の内1-1-1<br>日本</p>
        </div>
        <div class="info-item">
          <h3>📞 電話</h3>
          <p>+81-90-1234-5678</p>
        </div>
        <div class="info-item">
          <h3>📧 メール</h3>
          <p>info@example.com</p>
        </div>
        <div class="info-item">
          <h3>🕐 営業時間</h3>
          <p>月〜金: 9:00 AM - 6:00 PM<br>土: 10:00 AM - 4:00 PM<br>日: 休業</p>
        </div>
      </section>

      <section class="contact-form">
        <h2>メッセージを送信</h2>
        
        <div v-if="submitted" class="success-message">
          ✓ ありがとうございます！メッセージを受け取りました。すぐにご連絡させていただきます。
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">お名前</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              placeholder="お名前"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">メールアドレス</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="message">メッセージ</label>
            <textarea
              id="message"
              v-model="formData.message"
              placeholder="メッセージをお送りください..."
              rows="5"
              required
            ></textarea>
          </div>

          <button type="submit" class="submit-button">送信</button>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>
.contact {
  max-width: 1000px;
  margin: 0 auto;
}

.contact h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 3rem;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.contact-info,
.contact-form {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
}

.contact-info h2,
.contact-form h2 {
  color: #42b983;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.info-item {
  margin-bottom: 1.5rem;
}

.info-item h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.info-item p {
  color: #666;
  line-height: 1.6;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.submit-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

.submit-button:hover {
  background-color: #369970;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  border: 1px solid #c3e6cb;
}

@media (max-width: 768px) {
  .contact h1 {
    font-size: 1.8rem;
  }

  .contact-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .contact-info,
  .contact-form {
    padding: 1.5rem;
  }
}
</style>
