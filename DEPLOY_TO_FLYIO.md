# Fly.io デプロイ手順

このドキュメントでは、BJJ スケジュールアプリを Fly.io にデプロイする手順を説明します。

## 前提条件

- Fly.io アカウント
- Fly CLI がインストールされていること
- Git リポジトリがセットアップされていること

## デプロイ手順

### 1. Fly CLI のインストール

まだインストールしていない場合は、Fly CLI をインストールします：

```bash
# macOS
brew install flyctl

# Linux
curl -L https://fly.io/install.sh | sh

# Windows
iwr https://fly.io/install.ps1 -useb | iex
```

### 2. Fly.io にログイン

```bash
fly auth login
```

### 3. アプリケーションの初期化

プロジェクトのルートディレクトリで以下のコマンドを実行します：

```bash
fly launch
```

このコマンドは対話的に設定を行います。以下の点に注意してください：

- アプリ名を選択（例：bjj-schedule-app）
- リージョンを選択（例：東京 - nrt）
- PostgreSQL や Redis などのデータベースは必要に応じて設定

### 4. 環境変数の設定

必要な環境変数を設定します：

```bash
fly secrets set NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
fly secrets set NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 5. デプロイ

アプリケーションをデプロイします：

```bash
fly deploy
```

### 6. デプロイの確認

デプロイが完了したら、アプリケーションの URL を確認します：

```bash
fly open
```

## トラブルシューティング

### ログの確認

問題が発生した場合は、ログを確認します：

```bash
fly logs
```

### SSH アクセス

必要に応じて、インスタンスに SSH でアクセスできます：

```bash
fly ssh console
```

### スケーリング

アプリケーションのスケーリングが必要な場合：

```bash
fly scale count 2  # インスタンス数を2に設定
fly scale vm shared-cpu-1x  # VMサイズを変更
```

## 更新とロールバック

### アプリケーションの更新

コードを変更した後、再デプロイします：

```bash
fly deploy
```

### ロールバック

問題が発生した場合は、以前のバージョンにロールバックできます：

```bash
fly releases
fly deploy --release v1  # v1 は以前のリリースバージョン
```

## 参考リンク

- [Fly.io ドキュメント](https://fly.io/docs/)
- [Next.js on Fly.io](https://fly.io/docs/js/frameworks/nextjs/)