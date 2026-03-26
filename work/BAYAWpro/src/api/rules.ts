// ルール管理 API（バックエンド通信用）

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// ルール保存
export const saveRuleToServer = async (ruleName: string, ruleData: string): Promise<ApiResponse<null>> => {
  try {
    const response = await fetch('/api/rules/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ruleName,
        ruleData,
      }),
    })
    return await response.json()
  } catch (error) {
    console.error('ルール保存エラー:', error)
    return { success: false, error: 'ルール保存に失敗しました' }
  }
}

// ルール読込（全データ）
export const loadRulesFromServer = async (): Promise<ApiResponse<Record<string, any>>> => {
  try {
    const response = await fetch('/api/rules/list', {
      method: 'GET',
    })
    return await response.json()
  } catch (error) {
    console.error('ルール読込エラー:', error)
    return { success: false, error: 'ルール読込に失敗しました' }
  }
}

// ルール削除
export const deleteRuleFromServer = async (ruleName: string): Promise<ApiResponse<null>> => {
  try {
    const response = await fetch('/api/rules/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ruleName,
      }),
    })
    return await response.json()
  } catch (error) {
    console.error('ルール削除エラー:', error)
    return { success: false, error: 'ルール削除に失敗しました' }
  }
}
