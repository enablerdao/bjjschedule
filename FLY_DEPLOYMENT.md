# Fly.io デプロイ手順

## 前提条件

1. Fly.ioアカウント
2. Fly CLIのインストール

## Fly CLIのインストール

```bash
curl -L https://fly.io/install.sh | sh
```

または

```bash
npm install -g @fly/fly
```

## デプロイ手順

### 1. Fly.ioにログイン

```bash
fly auth login
```

ブラウザが開き、Fly.ioのログインページが表示されます。ログイン後、CLIでの認証が完了します。

### 2. アプリケーションの初期化

プロジェクトディレクトリで以下のコマンドを実行します：

```bash
cd /workspace/bjj-schedule-app
fly launch
```

対話式のセットアップが始まります：
- アプリ名を入力（例：bjj-schedule-app）
- リージョンを選択（例：Tokyo (nrt)）
- PostgreSQLデータベースの設定（必要な場合）

### 3. 環境変数の設定

```bash
fly secrets set NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
fly secrets set NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
fly secrets set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### 4. デプロイの実行

```bash
fly deploy
```

### 5. デプロイの確認

```bash
fly status
```

### 6. アプリケーションを開く

```bash
fly open
```

## トラブルシューティング

### ログの確認

```bash
fly logs
```

### シェルアクセス

```bash
fly ssh console
```

### スケーリング

```bash
fly scale count 2  # インスタンス数を2に設定
```

### リージョンの追加

```bash
fly regions add fra  # フランクフルトリージョンを追加
```

## Fly.ioダッシュボード

Fly.ioのダッシュボードにアクセスするには、以下のURLにアクセスしてください：

[https://fly.io/dashboard](https://fly.io/dashboard)

ここでアプリケーションの管理、モニタリング、スケーリングなどを行うことができます。