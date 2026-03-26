// API設定ファイル

export const API_CONFIG = {
  // 開発環境
  development: {
    baseURL: 'http://localhost:5173', // Viteプロキシ経由
    endpoints: {
      extract: '/api/extract',
      rules: {
        save: '/api/rules/save',
        list: '/api/rules/list',
        delete: '/api/rules/delete',
      },
    },
  },

  // 本番環境
  production: {
    baseURL: 'https://api.example.com',
    endpoints: {
      extract: '/api/extract',
      rules: {
        save: '/api/rules/save',
        list: '/api/rules/list',
        delete: '/api/rules/delete',
      },
    },
  },
}

export const getConfig = () => {
  return API_CONFIG[import.meta.env.MODE as 'development' | 'production']
}
