<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRuleStore } from '../stores/ruleStore'
import { useExtractStore } from '../stores/extractStore'
import { loadRulesFromServer } from '../api/rules'
import type { ExtractionResult, RuleSetting } from '../types'

const ruleStore = useRuleStore()
const extractStore = useExtractStore()

const selectedFile = ref<File | null>(null)
const selectedRuleName = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const mockResult = ref<ExtractionResult | null>(null)

onMounted(() => {
  // ローカルストレージからルールを読み込む
  const stored = localStorage.getItem('ruleSettings')
  if (stored) {
    try {
      ruleStore.ruleList = JSON.parse(stored)
    } catch (e) {
      console.error('ルール読み込みエラー:', e)
    }
  }
  // サーバーからも読み込み可能（本番環境用）
  // loadRulesFromServer().then(res => {
  //   if (res.success && res.data) {
  //     ruleStore.ruleList = Object.values(res.data) as RuleSetting[]
  //   }
  // })
})

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    selectedFile.value = input.files[0]
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleExecute = async () => {
  if (!selectedFile.value) {
    alert('画像ファイルを選択してください')
    return
  }

  if (!selectedRuleName.value) {
    alert('ルールを選択してください')
    return
  }

  extractStore.isLoading = true

  try {
    const selectedRule = ruleStore.ruleList.find((r) => r.ruleName === selectedRuleName.value)
    if (!selectedRule) {
      throw new Error('ルールが見つかりません')
    }

    // バックエンドに画像とルールを送信
    const formData = new FormData()
    formData.append('image', selectedFile.value)
    formData.append('rule', JSON.stringify(selectedRule))

    const response = await fetch('/api/extract', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('バックエンド通信エラー')
    }

    const result = await response.json()

    // バックエンドから返却されたデータを保存
    extractStore.extractionResult = result
    extractStore.uploadedImage = selectedFile.value
    extractStore.imagePreview = URL.createObjectURL(selectedFile.value)
  } catch (error) {
    console.error('抽出実行エラー:', error)
    alert('抽出処理に失敗しました: ' + (error instanceof Error ? error.message : ''))
  } finally {
    extractStore.isLoading = false
  }
}

const handleClear = () => {
  selectedFile.value = null
  selectedRuleName.value = ''
  extractStore.clearResult()
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const getAnnotationStyle = (coordinates: { x: number; y: number; width: number; height: number } | undefined) => {
  if (!coordinates) {
    return {}
  }
  return {
    left: coordinates.x + 'px',
    top: coordinates.y + 'px',
    width: coordinates.width + 'px',
    height: coordinates.height + 'px',
  }
}
</script>

<template>
  <div class="document-extract">
    <h1>抽出実行</h1>

    <div class="control-panel">
      <div class="upload-section">
        <h2>ステップ 1: 画像をアップロード</h2>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          @change="handleFileSelect"
          style="display: none"
        />
        <button @click="triggerFileInput" class="upload-button">
          📁 画像を選択
        </button>
        <div v-if="selectedFile" class="file-info">
          ✓ ファイル: {{ selectedFile.name }}
        </div>
      </div>

      <div class="rule-selection">
        <h2>ステップ 2: ルールを選択</h2>
        <select v-model="selectedRuleName" class="rule-select">
          <option value="">-- ルールを選択 --</option>
          <option v-for="rule in ruleStore.ruleList" :key="rule.ruleName" :value="rule.ruleName">
            {{ rule.ruleName }}
          </option>
        </select>
        <div v-if="selectedRuleName" class="rule-preview">
          <p>
            <strong>選択されたルール:</strong> {{ selectedRuleName }}
          </p>
        </div>
      </div>

      <div class="execute-section">
        <h2>ステップ 3: 実行</h2>
        <div class="button-group">
          <button @click="handleExecute" :disabled="extractStore.isLoading" class="execute-button">
            {{ extractStore.isLoading ? '処理中...' : '抽出実行' }}
          </button>
          <button @click="handleClear" class="clear-button">クリア</button>
        </div>
      </div>
    </div>

    <div v-if="extractStore.extractionResult" class="results-container">
      <h2>抽出結果</h2>
      <div class="results-layout">
        <div class="image-viewer">
          <h3>画像プレビュー</h3>
          <div v-if="extractStore.imagePreview" class="image-box">
            <img :src="extractStore.imagePreview" alt="アップロード画像" class="preview-image" />
            <div class="annotations">
              <div
                v-for="(result, index) in (extractStore.extractionResult?.results ?? [])"
                :key="index"
                v-if="result.coordinates"
                :style="getAnnotationStyle(result.coordinates)"
                class="annotation"
              >
                <span class="annotation-label">{{ result.attributeName }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="results-display">
          <h3>抽出データ</h3>
          <div v-if="extractStore.extractionResult && extractStore.extractionResult.status === 'success'" class="results-table">
            <div v-for="(result, index) in (extractStore.extractionResult?.results ?? [])" :key="index" class="result-row">
              <div class="result-attribute">{{ result.attributeName }}</div>
              <div class="result-value">{{ result.value }}</div>
            </div>
          </div>
          <div v-else class="error-message">{{ extractStore.extractionResult?.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.document-extract {
  max-width: 1400px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.control-panel {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.upload-section,
.rule-selection,
.execute-section {
  margin-bottom: 2rem;
}

.upload-section h2,
.rule-selection h2,
.execute-section h2 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.upload-button {
  padding: 1rem 2rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.upload-button:hover {
  background-color: #369970;
}

.file-info {
  margin-top: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 4px;
  color: #42b983;
}

.rule-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.rule-select:focus {
  outline: none;
  border-color: #42b983;
}

.rule-preview {
  margin-top: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 4px;
}

.rule-preview p {
  color: #555;
}

.button-group {
  display: flex;
  gap: 1rem;
}

.execute-button,
.clear-button {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.execute-button {
  background-color: #42b983;
  color: white;
}

.execute-button:hover:not(:disabled) {
  background-color: #369970;
}

.execute-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.clear-button {
  background-color: #999;
  color: white;
}

.clear-button:hover {
  background-color: #777;
}

.results-container {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
}

.results-container h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.results-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.image-viewer,
.results-display {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
}

.image-viewer h3,
.results-display h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.image-box {
  position: relative;
  display: inline-block;
  width: 100%;
}

.preview-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  display: block;
}

.annotations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.annotation {
  position: absolute;
  border: 2px solid #ff6b6b;
  background-color: rgba(255, 107, 107, 0.1);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.annotation-label {
  background-color: #ff6b6b;
  color: white;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  border-radius: 2px;
  white-space: nowrap;
  margin-bottom: 2px;
}

.results-table {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.result-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  border-left: 3px solid #42b983;
}

.result-attribute {
  font-weight: 500;
  color: #2c3e50;
}

.result-value {
  color: #555;
}

.error-message {
  padding: 1rem;
  background-color: #ffe0e0;
  border-left: 3px solid #ff6b6b;
  color: #ff6b6b;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .button-group {
    flex-direction: column;
  }

  .results-layout {
    grid-template-columns: 1fr;
  }

  .result-row {
    grid-template-columns: 1fr;
  }
}
</style>
