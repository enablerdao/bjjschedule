# BJJ Schedule App - 手動デプロイ手順

Renderへの手動デプロイ手順を以下に示します。

## 前提条件

1. Renderアカウント
2. GitHubアカウント（オプション）

## 手順1: プロジェクトをGitHubにプッシュする（オプション）

GitHubリポジトリを使用する場合は、以下の手順でプロジェクトをプッシュします：

```bash
# GitHubリポジトリを作成し、リモートとして追加
git remote add origin https://github.com/yourusername/bjj-schedule-app.git

# 変更をプッシュ
git push -u origin master
```

## 手順2: Renderダッシュボードからデプロイする

### GitHubリポジトリを使用する場合

1. [Renderダッシュボード](https://dashboard.render.com/)にログイン
2. 「New +」ボタンをクリックし、「Web Service」を選択
3. GitHubアカウントを接続し、bjj-schedule-appリポジトリを選択
4. 以下の設定を行います：
   - **Name**: bjj-schedule-app
   - **Environment**: Node
   - **Region**: お好みのリージョン
   - **Branch**: master（またはmain）
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. 「Advanced」セクションを開き、以下の環境変数を設定：
   - `NEXT_PUBLIC_SUPABASE_URL`: SupabaseプロジェクトのURL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabaseの匿名キー
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps APIキー
6. 「Create Web Service」ボタンをクリック

### ローカルプロジェクトを直接アップロードする場合

1. [Renderダッシュボード](https://dashboard.render.com/)にログイン
2. 「New +」ボタンをクリックし、「Web Service」を選択
3. 「Upload Files」オプションを選択
4. プロジェクトのZIPファイルを作成：
   ```bash
   cd /workspace
   zip -r bjj-schedule-app.zip bjj-schedule-app
   ```
5. 作成したZIPファイルをアップロード
6. 以下の設定を行います：
   - **Name**: bjj-schedule-app
   - **Environment**: Node
   - **Region**: お好みのリージョン
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
7. 「Advanced」セクションを開き、以下の環境変数を設定：
   - `NEXT_PUBLIC_SUPABASE_URL`: SupabaseプロジェクトのURL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabaseの匿名キー
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps APIキー
8. 「Create Web Service」ボタンをクリック

## 手順3: デプロイの確認

1. デプロイが完了するまで待ちます（通常5〜10分）
2. デプロイが成功したら、提供されたURLでアプリケーションにアクセスできます
3. ログを確認して、エラーがないことを確認します

## トラブルシューティング

デプロイに問題がある場合：

1. Renderダッシュボードでビルドログを確認
2. 環境変数が正しく設定されていることを確認
3. package.jsonのscriptsセクションが正しく設定されていることを確認
4. 依存関係に問題がないか確認