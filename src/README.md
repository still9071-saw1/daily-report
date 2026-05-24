# Step10 課題学習メモ（Vite + Firebase + Firestore）

## 今回行った内容

今回の課題では、Vite環境へFirebaseを導入し、Firestore Databaseとの接続を行った。

主に、

- Firestoreからデータ取得
- Firestoreへデータ保存
- HTML tableへの表示

までを実装した。

---

# 1. Viteプロジェクト作成

## 作成直後の構成

```txt
daily-report
├── index.html
├── package.json
├── public
└── src
    ├── main.js
    ├── style.css
    └── sanitize.css
```

## 初期化作業

- counter.js 削除
- ViteサンプルHTML削除
- style.css 初期化
- 必要なHTMLへ変更

---

# 2. sanitize.css と Google Fonts

## sanitize.css

```txt
ブラウザごとの差異をリセットするCSS
```

デザインを作るものではなく、ブラウザ初期差異を整える役割。

## Google Fonts

```html
<link
  href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

を使用。

---

# 3. Vite と Live Server の違い

## 重要ポイント

Viteでは：

```bash
npm run dev
```

で起動する。

## 理由

Viteが：

```txt
import/export
node_modules
firebase/app
```

などを内部解決しているため。

---

## エラー

```txt
Failed to resolve module specifier "firebase/app"
```

### 原因

Live Serverで開いていた。

### 解決

```bash
npm run dev
```

でViteサーバ起動。

---

# 4. Firebase導入

## Firebase SDK追加

```bash
npm install firebase
```

## Firebase CLI追加

```bash
npm install -g firebase-tools
```

### 違い

#### firebase

```txt
アプリ側ライブラリ
```

#### firebase-tools

```txt
CLI（コマンド操作ツール）
```

---

# 5. Firebase Project と Firestore

## 実施内容

- Firebase Project 作成
- Web App追加
- Firestore Database作成

---

# 6. Firestoreからデータ取得

## 使用機能

```js
import {
  getFirestore,
  collection,
  getDocs
} from "firebase/firestore";
```

## 取得処理

```js
const querySnapshot = await getDocs(collection(db, "reports"));
```

## 流れ

```txt
Firestore
↓
querySnapshot
↓
forEach
↓
HTML生成
↓
table表示
```

---

# 7. table構造の理解

## th

```html
<th>Date</th>
```

```txt
table header
表の見出し
```

## td

```html
<td>データ</td>
```

```txt
table data
実データ
```

## tr

```html
<tr></tr>
```

```txt
table row
1行
```

---

# 8. Firestoreへデータ保存

## 使用機能

```js
addDoc()
```

## 保存処理

```js
await addDoc(collection(db, "reports"), {
  date: new Date(),
  name: formData.get("name"),
  work: formData.get("work"),
  comment: formData.get("comment")
});
```

## 流れ

```txt
form入力
↓
submit
↓
Firestore保存
```

---

# 9. 現在のアプリ状態

## 完了済み

```txt
Firestore取得
Firestore保存
table表示
```

## CRUDでいうと

```txt
Create
Read
```

まで実装済み。

---

# 10. import の理解

## 間違い

```js
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
```

### 問題

```txt
同じ名前を再定義
```

になる。

## 正しい形

```js
import {
  getFirestore,
  collection,
  getDocs,
  addDoc
} from "firebase/firestore";
```

---

# 11. テンプレートリテラル

## 間違い

```js
console.log("${doc.id}");
```

## 正しい

```js
console.log(`${doc.id}`);
```

## 重要

```txt
` `
```

バッククォートが必要。

---

# 12. セミコロンの理解

## セミコロンが付きやすいもの

```js
const test = () => {};
const a = 1;
functionCall();
```

### 理由

```txt
式
```

だから。

---

## 不要なもの

```js
if () {}
for () {}
while () {}
function test() {}
```

### 理由

```txt
制御構文（文）
```

だから。

---

# 13. fetchHistoryData() の引数違い

## 教材側

```js
fetchHistoryData(getDocs, collection, db);
```

## 自分側

```js
fetchHistoryData();
```

## 理解

教材側は：

```txt
関数が何を使っているか
```

を見せる目的の可能性が高い。

実務では：

```js
fetchHistoryData();
```

の方が自然。

---

# 14. Firebase Config と GitHub

## 現状

```js
const firebaseConfig = {
  apiKey: "...",
}
```

が main.js に存在。

## 判断

現在は：

```txt
GitHub公開しない
```

判断。

## 今後予定

- .env化
- .gitignore確認
- Firestore Rules確認

を行った後に公開検討。

---

# 15. 現在の理解

## 大きな流れ

```txt
HTML
↓
JavaScript
↓
Firestore
↓
DOM表示
```

## 今回重要だったこと

```txt
「ただ写経する」
```

ではなく、

```txt
データがどう流れているか
```

を理解し始めた。

---

# 次回予定

- リファクタリング
- firebase.js 分離
- .env対応
- Firestore Rules確認
- GitHub公開準備

# Step10 課題学習メモ 追記（リファクタリング・環境変数・Firestore Rules）

---

# 16. 関数分割（リファクタリング）

## 実施内容

以下の関数を `main.js` から分離。

- fetchHistoryData
- submitDate

---

## 目的

```txt
main.js の責務を減らす
```

```txt
機能ごとにコード分割する
```

---

## フォルダ構成イメージ

```txt
src
├── main.js
└── my-modules
    ├── fetchHistoryData.js
    └── submitDate.js
```

---

# 17. export / import の実践利用

## export 側

```js
export const fetchHistoryData = async () => {
  ...
};
```

---

## import 側

```js
import { fetchHistoryData } from "./my-modules/fetchHistoryData";
```

---

## 理解したこと

以前学習した：

```txt
export
import
```

は、

```txt
コード分割・機能整理
```

のために使われる。

---

# 18. fetchHistoryData の3引数の意味

## 教材側

```js
fetchHistoryData(getDocs, collection, db);
```

---

## 自分側

```js
fetchHistoryData();
```

---

## 理解

教材側は：

```txt
この関数が何を使用しているか
```

を見えやすくする目的。

---

## 今回つながった内容

関数を別ファイル化すると：

```txt
fetchHistoryData.js
```

側には：

```txt
db
getDocs
collection
```

が存在しない。

そのため、

```txt
必要なものを引数で受け取る
```

設計になっていた。

---

# 19. import の配置

## 現状

```js
const db = getFirestore(app);

import { fetchHistoryData } from "./my-modules/fetchHistoryData";
```

でも動作した。

---

## 理解

ES Modulesでは：

```txt
トップレベル
```

にあれば動作可能。

---

## 実務的には

```txt
import はファイル上部へまとめる
```

事が一般的。

---

# 20. .env による環境変数管理

## 作成ファイル

```txt
.env
```

---

## 記述内容

```env
VITE_API_KEY=xxxxx
VITE_AUTH_DOMAIN=xxxxx
VITE_PROJECT_ID=xxxxx
VITE_STORAGE_BUCKET=xxxxx
VITE_MESSAGING_SENDER_ID=xxxxx
VITE_APP_ID=xxxxx
```

---

# 21. Vite の環境変数ルール

## 重要

```txt
VITE_
```

接頭辞が必要。

---

## 理由

Viteでは：

```txt
VITE_ が付いた環境変数のみ
```

フロント側で利用可能。

---

## 使用方法

```js
import.meta.env.VITE_API_KEY
```

---

# 22. 教材の誤記に気づいた

## 教材画像

```env
APP_I=
```

となっていた。

---

## 正しくは

```env
VITE_APP_ID=
```

---

## 理由

```txt
VITE_ が無いと Vite が読み込まない
```

ため。

---

# 23. .gitignore 設定

## 追加内容

```txt
.env
```

---

## 理由

```txt
GitHubへ環境変数を push しない
```

ため。

---

## 確認

```bash
git status
```

で：

```txt
.env が表示されない
```

状態を確認。

---

# 24. .env と安全性の理解

## 理解したこと

```txt
.env = 完全秘密
```

ではない。

---

## 理由

今回のFirebase設定は：

```txt
フロント側で利用される
```

ため、ブラウザから確認可能。

---

## 本当に重要なもの

```txt
Firestore Rules
認証
権限制御
```

---

# 25. Firestore Rules の修正

## 初期状態

```js
allow read, write: if request.time < timestamp.date(...);
```

---

## 問題点

```txt
誰でも read / write 可能
```

状態。

---

# 26. 修正後 Rules

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /reports/{document} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if false;
    }

  }
}
```

---

# 27. Rules 修正後の状態

## 許可

```txt
read
create
```

---

## 禁止

```txt
update
delete
```

---

## 制限範囲

```txt
reports コレクションのみ
```

---

# 28. 現時点での安全性理解

## 以前

```txt
全コレクション
全データ
read/write全許可
```

---

## 現在

```txt
reports のみ
read/create のみ
```

へ制限。

---

# 29. 現時点の構成理解

## アプリ構成

```txt
HTML
↓
JavaScript
↓
Firestore
↓
DOM表示
```

---

## 現在できること

```txt
Firestore取得
Firestore保存
table表示
モジュール分割
環境変数管理
Rules制御
```

---

# 30. 現在の理解

## 重要だった点

```txt
「動くだけ」
```

ではなく、

```txt
なぜそうなるか
```

を考えながら進めた。

---

# 次回予定

- Firebase Hosting
- deploy
- GitHub公開確認
- Rules追加理解
- firebase.js 分離検討