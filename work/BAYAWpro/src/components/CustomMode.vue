<script setup lang="ts">
import { ref } from 'vue'
import type { ExtractAttribute } from '../types'

const emit = defineEmits<{
  updateAttributes: [attributes: ExtractAttribute]
}>()

const ruleName = ref('')
const attributes = ref<ExtractAttribute>({})
const newAttributeName = ref('')
const newAttributeDescription = ref('')

const addAttribute = () => {
  if (!newAttributeName.value) {
    alert('属性名を入力してください')
    return
  }
  if (attributes.value[newAttributeName.value]) {
    alert('同じ属性名は既に存在しています')
    return
  }
  attributes.value[newAttributeName.value] = {
    enabled: true,
    description: newAttributeDescription.value,
  }
  newAttributeName.value = ''
  newAttributeDescription.value = ''
}

const deleteAttribute = (attributeName: string) => {
  delete attributes.value[attributeName]
}

const toggleAttribute = (attributeName: string) => {
  if (attributes.value[attributeName]) {
    attributes.value[attributeName].enabled = !attributes.value[attributeName].enabled
  }
}

const handleSave = () => {
  if (!ruleName.value) {
    alert('ルール名を入力してください')
    return
  }
  if (Object.keys(attributes.value).length === 0) {
    alert('最低1つの属性を追加してください')
    return
  }
  emit('updateAttributes', attributes.value)
}
</script>

<template>
  <div class="custom-mode">
    <div class="rule-name-input">
      <label for="ruleName">ルール名</label>
      <input
        id="ruleName"
        v-model="ruleName"
        type="text"
        placeholder="例: カスタム_請求書"
        class="input-field"
      />
    </div>

    <div class="add-attribute-section">
      <h3>属性を追加</h3>
      <div class="add-attribute-form">
        <input
          v-model="newAttributeName"
          type="text"
          placeholder="属性名 (例: 請求先住所)"
          class="input-field"
        />
        <input
          v-model="newAttributeDescription"
          type="text"
          placeholder="説明 (オプション)"
          class="input-field"
        />
        <button @click="addAttribute" class="add-button">追加</button>
      </div>
    </div>

    <div class="attributes-panel">
      <h3>属性一覧</h3>
      <div v-if="Object.keys(attributes).length === 0" class="empty-state">
        属性がまだ追加されていません
      </div>
      <div v-else class="attributes-list">
        <div v-for="(attribute, name) in attributes" :key="name" class="attribute-item">
          <label class="checkbox-label">
            <input
              type="checkbox"
              :checked="attribute.enabled"
              @change="toggleAttribute(name)"
              class="checkbox"
            />
            <div class="attribute-info">
              <span class="attribute-name">{{ name }}</span>
              <span v-if="attribute.description" class="attribute-description">
                {{ attribute.description }}
              </span>
            </div>
          </label>
          <button @click="deleteAttribute(name)" class="delete-btn">削除</button>
        </div>
      </div>
    </div>

    <button @click="handleSave" class="save-button">ルールを保存</button>
  </div>
</template>

<style scoped>
.custom-mode {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
}

.rule-name-input {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
}

.rule-name-input label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

.input-field {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.input-field:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.add-attribute-section {
  background-color: white;
  padding: 1.5rem;
  border-radius: 4px;
  margin-bottom: 2rem;
}

.add-attribute-section h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.add-attribute-form {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.add-attribute-form .input-field {
  flex: 1;
  min-width: 200px;
  margin-bottom: 0;
}

.add-button {
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
}

.add-button:hover {
  background-color: #369970;
}

.attributes-panel {
  margin-bottom: 2rem;
}

.attributes-panel h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.empty-state {
  background-color: white;
  padding: 2rem;
  border-radius: 4px;
  text-align: center;
  color: #999;
}

.attributes-list {
  background-color: white;
  border-radius: 4px;
  padding: 1.5rem;
}

.attribute-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
}

.attribute-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  flex: 1;
}

.checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin-right: 0.75rem;
}

.attribute-info {
  display: flex;
  flex-direction: column;
}

.attribute-name {
  font-weight: 500;
  color: #2c3e50;
}

.attribute-description {
  font-size: 0.85rem;
  color: #999;
  margin-top: 0.25rem;
}

.delete-btn {
  padding: 0.5rem 1rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-btn:hover {
  background-color: #ff5252;
}

.save-button {
  width: 100%;
  padding: 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #369970;
}

@media (max-width: 768px) {
  .add-attribute-form {
    flex-direction: column;
  }

  .add-attribute-form .input-field {
    min-width: 100%;
  }
}
</style>
