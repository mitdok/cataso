# Cloudflareで実施する作業チェックリスト

この文書は、CatasoをCloudflareで運営するために、CloudflareダッシュボードおよびローカルCLIで実施する作業をまとめたものです。

現時点の推奨構成は、まずCloudflareを入口にし、既存Renderバックエンドへ中継する段階運用です。

```text
Cloudflare Pages
  frontend/ を配信

Cloudflare Worker
  /health
  /logs
  /stats
  WebSocketをRenderへ中継

Render backend
  現行Node.jsゲーム処理
  PostgreSQLでログ・勝敗・部屋状態を保存
```

完全にRenderを外すには、別途Cloudflare Workers + Durable Objects + D1への本格移植が必要です。

---

## 0. 事前確認

- [ ] Cloudflareアカウントにログインできる
- [ ] 対象ドメインをCloudflareで管理できる、または `*.pages.dev` / `*.workers.dev` で試験運用する
- [ ] GitHubリポジトリ `mitdok/cataso` にCloudflareからアクセスできる
- [ ] ローカルにNode.js/npmがある
- [ ] ローカルに最新コードを取得している

```bash
git pull --rebase origin main
```

---

## 1. Cloudflare Pagesを作成する

Cloudflareダッシュボードで実施します。

```text
Workers & Pages
→ Create application
→ Pages
→ Connect to Git
→ GitHubを選択
→ Repository: mitdok/cataso
```

Pages設定:

```text
Project name: cataso
Production branch: main
Framework preset: None
Build command: exit 0
Build output directory: frontend
Root directory: /
```

作成後、まず以下のようなURLで表示確認します。

```text
https://cataso.pages.dev/
```

確認項目:

- [ ] ロビー画面が表示される
- [ ] `LOGS` リンクが表示される
- [ ] 既存Renderバックエンドに接続できる
- [ ] 部屋一覧の人数・状態が更新される

---

## 2. Cloudflare Workerをデプロイする

このWorkerは、Cloudflare入口からRenderバックエンドへHTTP/WebSocketを中継します。

ローカルで実行します。

```bash
cd cloudflare
npm install
npx wrangler login
npm run deploy
```

デプロイ後、以下のようなWorker URLが表示されます。

```text
https://cataso-edge.<your-account>.workers.dev
```

このURLを控えます。

---

## 3. Workerの環境変数を確認する

`cloudflare/wrangler.toml` の初期値は以下です。

```toml
[vars]
UPSTREAM_HTTP = "https://tkmninja-mit.onrender.com"
UPSTREAM_WS = "wss://tkmninja-mit.onrender.com"
CORS_ORIGIN = "*"
```

Cloudflareダッシュボードで確認する場合:

```text
Workers & Pages
→ cataso-edge
→ Settings
→ Variables
```

確認項目:

- [ ] `UPSTREAM_HTTP` がRenderのHTTPS URLになっている
- [ ] `UPSTREAM_WS` がRenderのWSS URLになっている
- [ ] `CORS_ORIGIN` が `*` またはPagesのURLになっている

独自Render URLへ変える場合は、`wrangler.toml` を編集して再デプロイします。

```bash
npm run deploy
```

---

## 4. Workerのスモークテスト

ローカルで実行します。

```bash
cd cloudflare
CATASO_EDGE_URL=https://cataso-edge.<your-account>.workers.dev npm run test:smoke
```

期待結果:

```text
OK /health
OK /logs?room=0&limit=1
OK /stats?limit=1
```

失敗した場合:

- [ ] Renderバックエンドが起動しているか確認
- [ ] Render側の `/logs?room=0&limit=1` が直接開けるか確認
- [ ] Render側の `/stats?limit=1` が直接開けるか確認
- [ ] `UPSTREAM_HTTP` / `UPSTREAM_WS` が正しいか確認

---

## 5. WebSocket中継テスト

ブラウザのDevTools Consoleで実行します。

```js
const ws = new WebSocket('wss://cataso-edge.<your-account>.workers.dev');
ws.onopen = () => ws.send(String.fromCharCode(100));
ws.onmessage = (e) => console.log(e.data);
ws.onerror = (e) => console.log('error', e);
ws.onclose = (e) => console.log('close', e.code, e.reason);
```

期待結果:

- [ ] `d` または文字コード100系の部屋一覧レスポンスが返る
- [ ] ConsoleにWebSocket接続エラーが出ない
- [ ] Cloudflare Worker経由でRenderバックエンドへ到達している

失敗した場合:

- [ ] RenderバックエンドのWebSocketが直接つながるか確認
- [ ] Worker URLが `https://` ではなく `wss://` で指定されているか確認
- [ ] Cloudflare Workerのログを見る

```bash
npx wrangler tail
```

---

## 6. フロントエンドをCloudflare Workerへ向ける

Worker中継テストが成功したら、`frontend/js/const.js` を編集します。

変更前:

```js
var BACKEND_PROFILE = 'render';
var RENDER_WSURL = 'wss://tkmninja-mit.onrender.com';
var CLOUDFLARE_WSURL = '';
```

変更後:

```js
var BACKEND_PROFILE = 'cloudflare';
var RENDER_WSURL = 'wss://tkmninja-mit.onrender.com';
var CLOUDFLARE_WSURL = 'wss://cataso-edge.<your-account>.workers.dev';
```

コミットします。

```bash
git add frontend/js/const.js
git commit -m "Switch frontend backend profile to Cloudflare edge"
git push
```

Cloudflare Pagesが自動デプロイされるのを待ちます。

確認項目:

- [ ] Pagesのデプロイが成功する
- [ ] ロビーが表示される
- [ ] 部屋一覧が更新される
- [ ] 任意の部屋に入れる
- [ ] チャットできる
- [ ] ダイス・ベルが動く
- [ ] ログページが表示できる
- [ ] 勝率ページが表示できる

---

## 7. 独自ドメインを割り当てる

必要であればCloudflare Pagesへ独自ドメインを割り当てます。

```text
Workers & Pages
→ cataso Pages project
→ Custom domains
→ Set up a custom domain
```

例:

```text
cataso.dokasen.com
```

確認項目:

- [ ] DNSレコードが自動作成される
- [ ] SSL証明書が有効になる
- [ ] `https://cataso.dokasen.com/` で表示できる
- [ ] WebSocket接続がブロックされない

Worker側にも独自ドメインを割り当てる場合:

```text
Workers & Pages
→ cataso-edge Worker
→ Settings
→ Triggers
→ Custom Domains
```

例:

```text
cataso-api.dokasen.com
```

その場合、`frontend/js/const.js` は以下に変更します。

```js
var CLOUDFLARE_WSURL = 'wss://cataso-api.dokasen.com';
```

---

## 8. GitHub ActionsでPagesをデプロイする場合

CloudflareのGit連携を使う場合、この章は不要です。

GitHub ActionsでPagesへデプロイする場合、GitHubリポジトリ設定で以下を登録します。

```text
Settings
→ Secrets and variables
→ Actions
```

Secrets:

```text
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

Variables:

```text
CLOUDFLARE_PAGES_PROJECT=cataso
```

ワークフロー:

```text
.github/workflows/cloudflare-pages.yml
```

確認項目:

- [ ] GitHub Actionsが成功する
- [ ] Cloudflare Pagesに反映される

---

## 9. Render側Redisを外す場合

RenderはRedisなしでも動くように修正済みです。

Render Dashboardで以下を削除できます。

```text
REDIS_URL
REDIS_TLS_URL
```

残すもの:

```text
DATABASE_URL
```

確認項目:

- [ ] Render再起動後に以下のログが出る

```text
Redis disabled: using PostgreSQL room state fallback only
```

- [ ] ロビーが動く
- [ ] 部屋状態がPostgreSQLから復帰できる
- [ ] チャットログが保存される
- [ ] 勝敗・勝率が保存される

---

## 10. ロールバック手順

Cloudflare Worker経由で問題が出た場合、`frontend/js/const.js` をRenderへ戻します。

```js
var BACKEND_PROFILE = 'render';
var RENDER_WSURL = 'wss://tkmninja-mit.onrender.com';
var CLOUDFLARE_WSURL = 'wss://cataso-edge.<your-account>.workers.dev';
```

コミットします。

```bash
git add frontend/js/const.js
git commit -m "Rollback frontend backend profile to Render"
git push
```

Cloudflare Pages反映後、直接Renderへ接続する運用に戻ります。

---

## 11. 本格Cloudflare移行で残る作業

現在のWorkerはRenderへの中継です。

Renderを完全に外すには以下が必要です。

- [ ] `backend/app.js` のNode.js WebSocketサーバをCloudflare Workerへ移植
- [ ] 部屋ごとの状態管理をDurable Objectsへ移植
- [ ] チャットログをD1へ移植
- [ ] 勝敗・勝率記録をD1へ移植
- [ ] Redis依存を完全削除
- [ ] PostgreSQL依存をD1へ置換
- [ ] Durable Objects版のWebSocket負荷テスト
- [ ] D1のログ保持・削除ポリシー実装
- [ ] Render停止前の並行稼働期間を設定

推奨順序:

```text
1. Cloudflare Pages運用開始
2. Cloudflare Workerプロキシ運用開始
3. Render Redis削除、PostgreSQLのみ運用
4. Durable Objects版バックエンドを別URLで開発
5. テスト卓だけDurable Objects版へ接続
6. 全卓移行
7. Render停止
```

---

## 12. 完了条件

Cloudflare入口運用としての完了条件:

- [ ] Cloudflare Pagesでロビーが表示される
- [ ] Cloudflare Worker `/health` が成功する
- [ ] Cloudflare Worker `/logs` が成功する
- [ ] Cloudflare Worker `/stats` が成功する
- [ ] Cloudflare Worker経由WebSocketが成功する
- [ ] ロビーの部屋一覧が更新される
- [ ] 部屋に入れる
- [ ] チャットできる
- [ ] ログページで新しいログが上に出る
- [ ] 勝敗・勝率ページが表示される
- [ ] 問題発生時にRender直結へ戻せる
