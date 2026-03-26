import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { RuleSetting, Preset, ExtractAttribute } from '../types'

export const useRuleStore = defineStore('rule', () => {
  const currentRule = ref<RuleSetting | null>(null)
  const ruleList = ref<RuleSetting[]>([])

  // プリセット定義
  const presets = ref<Preset[]>([
    {
      name: '請求書プリセット',
      attributes: {
        '発行先住所': { enabled: true, description: '取引先の住所' },
        '発行先電話番号': { enabled: true, description: '' },
        '金額': { enabled: true, description: '' },
        '発行日': { enabled: true, description: '' },
        '請求書番号': { enabled: true, description: '' },
        '支払期日': { enabled: false, description: '' },
      },
    },
    {
      name: '領収書プリセット',
      attributes: {
        '発行先': { enabled: true, description: '' },
        '金額': { enabled: true, description: '' },
        '日付': { enabled: true, description: '' },
        '領収書番号': { enabled: true, description: '' },
      },
    },
  ])

  // ルール作成
  const createRule = (mode: 'preset' | 'custom', ruleName: string, extractAtt: ExtractAttribute) => {
    const newRule: RuleSetting = {
      mode,
      ruleName,
      extractAtt,
    }
    currentRule.value = newRule
    return newRule
  }

  // ルール保存
  const saveRule = (rule: RuleSetting) => {
    const index = ruleList.value.findIndex((r) => r.ruleName === rule.ruleName)
    if (index >= 0) {
      ruleList.value[index] = rule
    } else {
      ruleList.value.push(rule)
    }
    currentRule.value = rule
  }

  // ルール削除
  const deleteRule = (ruleName: string) => {
    ruleList.value = ruleList.value.filter((r) => r.ruleName !== ruleName)
    if (currentRule.value?.ruleName === ruleName) {
      currentRule.value = null
    }
  }

  // ルール読込
  const loadRule = (ruleName: string) => {
    const rule = ruleList.value.find((r) => r.ruleName === ruleName)
    if (rule) {
      currentRule.value = rule
    }
  }

  return {
    currentRule,
    ruleList,
    presets,
    createRule,
    saveRule,
    deleteRule,
    loadRule,
  }
})
