#!/bin/sh

workProj=vue_study	# 作業ディレクトリを指定

# package.jsonが存在しない場合、Vueプロジェクトを初期化
if [ ! -f "/app/$workProj/package.json" ]; then
	cd /app	# appディレクトリに移動

	# create時の質問は テンプレートを適用
 	npm create vite@latest $workProj -- --template vue
fi

cd /app/$workProj	# 作業ディレクトリに移動
npm install			# 依存関係のインストール
npm run dev			# 開発サーバーの起動
