# AI Voice Chat

## 概要

AI Voice Chat は、音声インターフェースを通じて AI と対話できるアプリケーションです。ユーザーの音声入力を受け取り、API リクエストに変換して実行し、結果を音声で返答します。

## 主な機能

- 音声認識による入力受付
- 自然言語から API リクエストへの変換
- API レスポンスの音声出力
- 会話履歴の管理
- 複数の API 対応

## 技術スタック

- Frontend: React
- 音声認識: Web Speech API
- 音声合成: Web Speech Synthesis API
- 状態管理: React Context
- API 通信: Axios

## セットアップ

1. リポジトリのクローン

```bash
git clone https://github.com/w712915/api-voice-chat.git
cd api-voice-chat
```

2. 依存パッケージのインストール

```bash
npm install
```

3. 環境変数の設定
   `.env`ファイルを作成し、API キーを設定します。

```bash
cp .env.example .env
```

4. アプリケーションの起動

```bash
npm run dev
```

## 使い方

1. ブラウザでアプリケーションを開く
2. マイクボタンをクリックして音声入力を開始
3. 実行したい API リクエストを音声で説明
4. 結果が音声で返答されます

## 開発ガイドライン

- コンポーネントは`src/components`ディレクトリに配置
- API ロジックは`src/api`ディレクトリに配置
- 型定義は`src/types`ディレクトリに配置
- ユーティリティ関数は`src/utils`ディレクトリに配置

## ライセンス

MIT ライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。
