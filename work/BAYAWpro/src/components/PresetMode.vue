<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Preset, ExtractAttribute } from '../types'

const props = defineProps<{
  presets: Preset[]
}>()

const emit = defineEmits<{
  selectPreset: [preset: Preset]
  updateAttributes: [attributes: ExtractAttribute]
}>()

const selectedPresetName = ref('')
const extractAttributes = ref<ExtractAttribute>({})
const ruleName = ref('')

const selectedPreset = computed(() => {
  return props.presets.find((p) => p.name === selectedPresetName.value)
})

const handleSelectPreset = (presetName: string) => {
  selectedPresetName.value = presetName
  const preset = props.presets.find((p) => p.name === presetName)
  if (preset) {
    extractAttributes.value = JSON.parse(JSON.stringify(preset.attributes))
    emit('selectPreset', preset)
  }
}

const toggleAttribute = (attributeName: string) => {
  if (extractAttributes.value[attributeName]) {
    extractAttributes.value[attributeName].enabled = !extractAttributes.value[attributeName].enabled
  }
}

const handleSave = () => {
  if (!ruleName.value) {
    alert('ルール名を入力してください')
    return
  }
  emit('updateAttributes', extractAttributes.value)
}
</script>

<template>
  <div class="preset-mode">
    <div class="preset-selector">
      <h3>プリセットを選択</h3>
      <div class="preset-buttons">
        <button
          v-for="preset in presets"
          :key="preset.name"
          :class="{ active: selectedPresetName === preset.name }"
          @click="handleSelectPreset(preset.name)"
          class="preset-btn"
        >
          {{ preset.name }}
        </button>
      </div>
    </div>

    <div v-if="selectedPreset" class="attributes-panel">
      <div class="rule-name-input">
        <label for="ruleName">ルール名</label>
        <input
          id="ruleName"
          v-model="ruleName"
          type="text"
          placeholder="例: 請求書_2024"
          class="input-field"
        />
      </div>

      <h3>抽出属性の選択</h3>
      <div class="attributes-list">
        <div
          v-for="(attribute, name) in selectedPreset.attributes"
          :key="name"
          class="attribute-item"
        >
          <label class="checkbox-label">
            <input
              type="checkbox"
              :checked="extractAttributes[name]?.enabled || false"
              @change="toggleAttribute(name)"
              class="checkbox"
            />
            <span class="attribute-name">{{ name }}</span>
          </label>
          <span v-if="attribute.description" class="attribute-description">
            {{ attribute.description }}
          </span>
        </div>
      </div>

      <button @click="handleSave" class="save-button">ルールを保存</button>
    </div>
  </div>
</template>

<style scoped>
.preset-mode {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
}

.preset-selector h3,
.attributes-panel h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.preset-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.preset-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #ddd;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.preset-btn:hover {
  border-color: #42b983;
  color: #42b983;
}

.preset-btn.active {
  background-color: #42b983;
  color: white;
  border-color: #42b983;
}

.attributes-panel {
  margin-top: 2rem;
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
}

.input-field:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.attributes-list {
  background-color: white;
  border-radius: 4px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.attribute-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
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

.attribute-name {
  font-weight: 500;
  color: #2c3e50;
}

.attribute-description {
  font-size: 0.85rem;
  color: #999;
  margin-left: auto;
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
  .preset-buttons {
    flex-direction: column;
  }

  .preset-btn {
    width: 100%;
  }
}
</style>
