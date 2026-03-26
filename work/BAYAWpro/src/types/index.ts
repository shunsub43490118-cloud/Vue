// ルール設定の型定義
export interface ExtractAttribute {
  [key: string]: {
    enabled: boolean
    description: string
  }
}

export interface RuleSetting {
  mode: 'preset' | 'custom'
  ruleName: string
  extractAtt: ExtractAttribute
}

// 抽出結果の型定義
export interface ExtractedValue {
  attributeName: string
  value: string
  coordinates?: {
    x: number
    y: number
    width: number
    height: number
  }
}

export interface ExtractionResult {
  status: 'success' | 'error'
  results: ExtractedValue[]
  message?: string
}

// プリセット定義
export interface Preset {
  name: string
  attributes: ExtractAttribute
}
