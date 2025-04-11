# Vercel デプロイ手順

## 前提条件

1. Vercelアカウント
2. GitHubアカウント（推奨）

## デプロイ方法

### 方法1: GitHubリポジトリを使用する（推奨）

1. プロジェクトをGitHubリポジトリにプッシュします
2. [Vercel](https://vercel.com/)にログインします
3. 「New Project」をクリックします
4. 「Import Git Repository」セクションからGitHubリポジトリを選択します
5. 環境変数を設定します：
   - `NEXT_PUBLIC_SUPABASE_URL`: SupabaseプロジェクトのURL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabaseの匿名キー
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps APIキー
6. 「Deploy」ボタンをクリックします

### 方法2: Vercel CLIを使用する

1. Vercel CLIをインストールします：
   ```bash
   npm install -g vercel
   ```

2. プロジェクトディレクトリで以下のコマンドを実行します：
   ```bash
   vercel login
   ```

3. デプロイを実行します：
   ```bash
   vercel
   ```

4. プロンプトに従って設定を行います：
   - プロジェクト名を入力
   - 環境変数を設定
   - デプロイ設定を確認

5. デプロイが完了すると、URLが表示されます

## デプロイURLの確認

デプロイが成功すると、以下のようなURLが表示されます：
```
https://bjj-schedule-app.vercel.app
```

## 環境変数の更新

1. Vercelダッシュボードにアクセスします
2. プロジェクトを選択します
3. 「Settings」タブをクリックします
4. 「Environment Variables」セクションで変数を追加または更新します
5. 変更を保存し、必要に応じて再デプロイします

## ドメインの設定

1. Vercelダッシュボードでプロジェクトを選択します
2. 「Settings」タブをクリックします
3. 「Domains」セクションでカスタムドメインを追加します
4. DNSレコードを設定して、ドメインをVercelに向けます

## 継続的デプロイ

GitHubリポジトリを使用している場合、mainブランチに変更をプッシュするたびに自動的にデプロイが実行されます。

## トラブルシューティング

デプロイに問題がある場合：

1. Vercelダッシュボードでビルドログを確認します
2. 環境変数が正しく設定されていることを確認します
3. package.jsonのscriptsセクションが正しく設定されていることを確認します
4. 依存関係に問題がないか確認します