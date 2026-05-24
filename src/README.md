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