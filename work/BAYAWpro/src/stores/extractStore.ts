import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ExtractionResult, ExtractedValue } from '../types'

export const useExtractStore = defineStore('extract', () => {
  const extractionResult = ref<ExtractionResult | null>(null)
  const isLoading = ref(false)
  const uploadedImage = ref<File | null>(null)
  const imagePreview = ref<string | null>(null)

  // 抽出処理実行
  const executeExtraction = async (image: File, ruleJson: string) => {
    isLoading.value = true
    try {
      // バックエンドに送信
      const formData = new FormData()
      formData.append('image', image)
      formData.append('rule', ruleJson)

      const response = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
      })

      const result: ExtractionResult = await response.json()
      extractionResult.value = result
      uploadedImage.value = image
      imagePreview.value = URL.createObjectURL(image)
      return result
    } catch (error) {
      console.error('抽出処理エラー:', error)
      extractionResult.value = {
        status: 'error',
        results: [],
        message: '抽出処理に失敗しました',
      }
    } finally {
      isLoading.value = false
    }
  }

  // 結果クリア
  const clearResult = () => {
    extractionResult.value = null
    uploadedImage.value = null
    imagePreview.value = null
  }

  return {
    extractionResult,
    isLoading,
    uploadedImage,
    imagePreview,
    executeExtraction,
    clearResult,
  }
})
