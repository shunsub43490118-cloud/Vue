<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRuleStore } from '../stores/ruleStore'
import { saveRuleToServer, loadRulesFromServer, deleteRuleFromServer } from '../api/rules'
import PresetMode from '../components/PresetMode.vue'
import CustomMode from '../components/CustomMode.vue'
import type { ExtractAttribute, RuleSetting } from '../types'

const ruleStore = useRuleStore()
const mode = ref<'preset' | 'custom'>('preset')

// ローカルストレージからルールを読み込む
const loadRulesFromLocalStorage = () => {
  const stored = localStorage.getItem('ruleSettings')
  if (stored) {
    try {
      const rules = JSON.parse(stored)
      ruleStore.ruleList = rules
    } catch (e) {
      console.error('ルール読み込みエラー:', e)
    }
  }
}

// ローカルストレージにルールを保存
const saveRulesToLocalStorage = () => {
  localStorage.setItem('ruleSettings', JSON.stringify(ruleStore.ruleList))
}

// サーバーからルールを読み込む
const loadRulesFromServerAPI = async () => {
  const response = await loadRulesFromServer()
  if (response.success && response.data) {
    // サーバーから取得したルールをメモリに格納
    ruleStore.ruleList = Object.values(response.data) as RuleSetting[]
  }
}

// サーバーにルールを保存
const saveRuleToServerAPI = async (rule: RuleSetting) => {
  const response = await saveRuleToServer(rule.ruleName, JSON.stringify(rule))
  if (response.success) {
    console.log('ルールをサーバーに保存しました')
  } else {
    console.error('サーバー保存エラー:', response.error)
    // フォールバック: ローカルストレージに保存
    saveRulesToLocalStorage()
  }
}

// サーバーからルールを削除
const deleteRuleFromServerAPI = async (ruleName: string) => {
  const response = await deleteRuleFromServer(ruleName)
  if (!response.success) {
    console.error('サーバー削除エラー:', response.error)
  }
}

onMounted(() => {
  // 開発環境ではローカルストレージから読み込む
  loadRulesFromLocalStorage()
  // 本番環境ではサーバーから読み込む場合はコメント解除
  // loadRulesFromServerAPI()
})

const handleUpdateAttributes = (attributes: ExtractAttribute) => {
  if (!ruleStore.currentRule) {
    console.error('ルール情報がありません')
    return
  }

  ruleStore.currentRule.extractAtt = attributes
  ruleStore.saveRule(ruleStore.currentRule)
  saveRulesToLocalStorage()
  // サーバーにも保存（オプション）
  saveRuleToServerAPI(ruleStore.currentRule)
  alert('ルールが保存されました')
}

const handleDeleteRule = (ruleName: string) => {
  ruleStore.deleteRule(ruleName)
  saveRulesToLocalStorage()
  // サーバーからも削除（オプション）
  deleteRuleFromServerAPI(ruleName)
}
</script>

<template>
  <div class="rule-settings">
    <h1>属性設定</h1>

    <div class="mode-switcher">
      <button
        :class="{ active: mode === 'preset' }"
        @click="mode = 'preset'"
        class="mode-btn"
      >
        プリセットモード
      </button>
      <button
        :class="{ active: mode === 'custom' }"
        @click="mode = 'custom'"
        class="mode-btn"
      >
        カスタムモード
      </button>
    </div>

    <div class="content-area">
      <PresetMode
        v-if="mode === 'preset'"
        :presets="ruleStore.presets"
        @select-preset="(p) => (ruleStore.currentRule = { mode: 'preset', ruleName: p.name, extractAtt: p.attributes })"
        @update-attributes="handleUpdateAttributes"
      />
      <CustomMode v-else @update-attributes="handleUpdateAttributes" />
    </div>

    <div class="rules-list-section">
      <h2>保存されたルール</h2>
      <div v-if="ruleStore.ruleList.length === 0" class="empty-message">
        ルールがまだ保存されていません
      </div>
      <div v-else class="rules-list">
        <div v-for="rule in ruleStore.ruleList" :key="rule.ruleName" class="rule-item">
          <div class="rule-info">
            <h3>{{ rule.ruleName }}</h3>
            <p class="rule-mode">モード: {{ rule.mode === 'preset' ? 'プリセット' : 'カスタム' }}</p>
            <p class="rule-attributes">
              属性数: {{ Object.keys(rule.extractAtt).length }}
            </p>
          </div>
          <div class="rule-actions">
            <button @click="ruleStore.loadRule(rule.ruleName)" class="load-btn">読込</button>
            <button @click="handleDeleteRule(rule.ruleName)" class="delete-btn">
              削除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rule-settings {
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.mode-switcher {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #ddd;
}

.mode-btn {
  padding: 1rem 2rem;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #999;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  font-weight: 500;
}

.mode-btn:hover {
  color: #2c3e50;
}

.mode-btn.active {
  color: #42b983;
  border-bottom-color: #42b983;
}

.content-area {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 3rem;
}

.rules-list-section {
  margin-top: 3rem;
}

.rules-list-section h2 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.empty-message {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  color: #999;
}

.rules-list {
  display: grid;
  gap: 1rem;
}

.rule-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.rule-info h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.rule-mode,
.rule-attributes {
  font-size: 0.9rem;
  color: #999;
  margin: 0.25rem 0;
}

.rule-actions {
  display: flex;
  gap: 0.5rem;
}

.load-btn,
.delete-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.load-btn {
  background-color: #42b983;
  color: white;
}

.load-btn:hover {
  background-color: #369970;
}

.delete-btn {
  background-color: #ff6b6b;
  color: white;
}

.delete-btn:hover {
  background-color: #ff5252;
}

@media (max-width: 768px) {
  .rule-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .rule-actions {
    width: 100%;
  }

  .rule-actions button {
    flex: 1;
  }
}
</style>
