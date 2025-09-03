# Day2課題

拝見しました。完璧です！ :tada:

1日目の課題クリア、おめでとうございます。

**良かった点**
* `interface` を使って、データの構造を明確に定義できています。
* 関数の引数と戻り値にしっかりと型アノテーションが記述されており、誰が見ても何を入出力する関数なのかが一目瞭然です。
* `tsconfig.json` で `"strict": true` が設定されており、 TypeScript の恩恵を最大限に引き出す意識が素晴らしいです。
* ディレクトリ構造も `src` と `dist` で分けられており、実践的な構成になっています。

**総評**
Python や Go の経験がしっかりと活かされており、静的型付けへの理解度の高さを感じます。
TypeScript の基本的な文法と、型を使ってコードの安全性を高めるという最も重要なコンセプトを、初日でしっかり掴むことができましたね。

素晴らしいスタートです！この調子で2日目に進みましょう。

---
### **【2日目】 TypeScript深掘り② 〜より柔軟な型を操る〜**

**本日のテーマ**:
昨日の基本の型に加え、TypeScript が得意とする、より表現力豊かで柔軟な型を学びます。特に `Generics`（ジェネリクス）は、様々な型に対応できる再利用性の高いコンポーネントや関数を作る上で必須の知識です。また、既存の JavaScript ライブラリにどうやって型を適用するのかを知ることで、実務での TypeScript の活用イメージを掴みます。

---
### **本日の達成目標**

1.  **`Array<T>`** や **`Promise<T>`** のように、型を引数として渡す **`Generics`** の基本的な考え方を説明できる。
2.  **`Union`**（`|`）と **`Intersection`**（`&`）を使い、複数の型を組み合わせた新しい型を定義できる。
3.  **型アサーション**（`as`）の役割と、それが必要になる場面を理解する。
4.  DefinitelyTyped（`@types/...`）の役割を理解し、型定義ファイルのない JavaScript ライブラリに型を追加できる。

---
### **課題**

昨日の自己紹介プログラムを拡張し、複数のユーザーデータを扱えるように改修してください。

**要件：**

1.  **汎用的なデータ管理クラスを作成する**
    * `DataHandler` という名前のクラスを作成してください。
    * このクラスは、**ジェネリクス**を使って、どんな型のデータでも扱えるようにしてください。（`DataHandler<T>` のように定義します）
    * 内部に、`T` 型の配列 `data` をプロパティとして持ちます。（`private data: T[] = [];`）
    * `addItem(item: T): void` というメソッドを持ち、データを追加できるようにしてください。
    * `getItemById(id: number): T | undefined` というメソッドを持ち、ID（配列のインデックス）を指定してデータを1件取得できるようにしてください。見つからない場合は `undefined` を返します。

2.  **型定義を拡張する**
    * 昨日の `Profile` 型に、`id: number` プロパティを追加してください。
    * 新しく、`JobHistory` という型（`type` または `interface`）を定義してください。
        * `companyName: string`
        * `role: string`
    * `ProfileWithHistory` という名前の新しい型を定義してください。これは、`Profile` 型と `JobHistory` 型を**Intersection**（`&`）で結合した型にしてください。

3.  **データを作成し、クラスで管理する**
    * `DataHandler` クラスを、昨日の `Profile` 型を扱うインスタンスとして生成してください。（`new DataHandler<Profile>()`）
    * 少なくとも2人分の `Profile` データを作成し、`addItem` メソッドでインスタンスに追加してください。（IDはそれぞれ `1`, `2` のように振ってください）

4.  **実行と結果の表示**
    * `getItemById` メソッドを使って、IDが `1` のユーザーデータを取得し、その `name` をコンソールに表示してください。
    * 存在しないID（例: `99`）を指定してデータを取得しようとし、結果が `undefined` になることを確認し、その旨をコンソールに表示してください。
        * （例: `ユーザー(ID: 99)は見つかりませんでした。`）

**提出物:**
上記の要件を満たした TypeScript ファイル（`index.ts`）を、昨日と同じリポジトリの `day2` ブランチ、または `day2` ディレクトリなどに Push して、URL を教えてください。

---
**ヒント:**
* クラスのインスタンスプロパティにアクセスするには `this` キーワードを使います。（例: `this.data`）
* `getItemById` でIDが範囲外の場合、`this.data[id]` は自動的に `undefined` を返しますが、戻り値の型注釈に `| undefined` を明記することが重要です。
* `Intersection` は、複数の型が持つすべてのプロパティを兼ね備えた新しい型を作ります。`type ProfileWithHistory = Profile & JobHistory;` のように記述します。

この課題を通して、より複雑なデータ構造を安全に扱うための TypeScript の強力な機能を体験してみましょう。頑張ってください！

# 不明点について質問

```typescript
// TODO: dataHandlerの配列インデックスでなくProfile IDを指定して名前を表示できるようにする
// TODO: IDが存在するときは名前を、存在しないときは"${id}は存在しません"という文字列を返す
```

ご質問ありがとうございます！非常に良いポイントですね。まさにジェネリクスを実務で使う際に直面する典型的な課題です。一つずつ解決していきましょう。

-----

### 1\. 配列インデックスではなく、ProfileのIDでデータを取得する方法

**課題**:
現在の `DataHandler<T>` クラスは、`T` がどんな型かを知りません。そのため、`T` が必ず `id` プロパティを持っていることを前提とした処理を書くことができません。

**解決策**:
**ジェネリクス制約 (Generic Constraints)** を使って、「`DataHandler` が扱う型 `T` は、必ず `id` という `number` 型のプロパティを持っていなければならない」というルールを TypeScript に教えます。

クラスの定義を以下のように変更します。

```typescript
// 変更前
// class DataHandler<T> {

// 変更後
class DataHandler<T extends { id: number }> {
  // ...
}
```

`extends { id: number }` が制約です。これにより、このクラス内では `T` 型のオブジェクトが必ず `id` プロパティを持つと TypeScript が認識してくれるため、`item.id` のようなコードを安全に書けるようになります。

この制約を付けた上で、`getItemById` メソッドを配列の `find` メソッドを使って書き換えます。`find` は、配列の各要素をチェックし、条件に一致した最初の要素を返すメソッドです。

```typescript
// getItemById メソッドの修正
getItemById(id: number): T | undefined {
  // this.data[id] ではなく、findメソッドでIDが一致するものを探す
  return this.data.find(item => item.id === id);
}
```

-----

### 2\. IDが存在すれば名前を、なければ特定の文字列を返す方法

**課題**:
IDの存在チェックと、その結果に応じた文字列の生成という2つの処理をどう実装するか。

**解決策**:
これは、先ほど修正した `getItemById` を利用して、クラスの外側でロジックを組み立てるのが良いアプローチです。`DataHandler` クラスの責務は「データの管理」に留め、「結果をどう表示するか」という責務は分離する方が、コードの見通しが良くなります。

以下のように、`getItemById` の返り値を使って条件分岐させます。

```typescript
// メインの処理部分
const targetId = 1;
const user = dataHandler.getItemById(targetId); // T | undefined が返ってくる

if (user) {
  // userが見つかった場合 (undefinedではない場合)
  console.log(user.name);
} else {
  // userが見つからなかった場合 (undefinedだった場合)
  console.log(`ユーザー(ID: ${targetId})は見つかりませんでした。`);
}

// 存在しないIDで試す
const targetIdNotFound = 99;
const userNotFound = dataHandler.getItemById(targetIdNotFound);

if (userNotFound) {
  console.log(userNotFound.name);
} else {
  console.log(`ユーザー(ID: ${targetIdNotFound})は見つかりませんでした。`);
}
```

`getItemById` の結果を一度変数 `user` に格納し、`if (user)` で存在チェックをしています。TypeScript はこの `if` 文の中では `user` が `undefined` ではないと賢く推論してくれるため、安全に `user.name` へアクセスできます。

-----

### 修正後のコード全体

上記を反映させた `index.ts` の全体像です。

```typescript:src/index.ts
// 1. 型定義
interface Profile {
  id: number;
  name: string;
  affiliation: string;
  experienceYears: number;
  interestedTechnologies: string[];
}

// 2. ジェネリクス制約を使ったクラス定義
class DataHandler<T extends { id: number }> {
  private data: T[] = [];

  addItem(item: T): void {
    this.data.push(item);
  }

  getItemById(id: number): T | undefined {
    return this.data.find(item => item.id === id);
  }
}

// 3. データ作成とクラスでの管理
const dataHandler = new DataHandler<Profile>();

dataHandler.addItem({
  id: 1,
  name: "Yamaji",
  affiliation: "Test Company",
  experienceYears: 8,
  interestedTechnologies: ["Cloud", "Container", "TypeScript"],
});

dataHandler.addItem({
  id: 2,
  name: "Tanaka",
  affiliation: "Test Company",
  experienceYears: 3,
  interestedTechnologies: ["React", "Go"],
});

// 4. 実行と結果の表示
console.log('--- ID 1 のユーザーを検索 ---');
const targetId = 1;
const user = dataHandler.getItemById(targetId);

if (user) {
  console.log(`取得したユーザー名: ${user.name}`);
} else {
  console.log(`ユーザー(ID: ${targetId})は見つかりませんでした。`);
}

console.log('--- ID 99 のユーザーを検索 ---');
const targetIdNotFound = 99;
const userNotFound = dataHandler.getItemById(targetIdNotFound);

if (userNotFound) {
  console.log(`取得したユーザー名: ${userNotFound.name}`);
} else {
  console.log(`ユーザー(ID: ${targetIdNotFound})は見つかりませんでした。`);
}
```

この修正で、当初の疑問点が両方解決できるかと思います。
ジェネリクス制約は TypeScript の中でも特に強力な機能の一つなので、この機会にぜひマスターしてください。素晴らしい質問でした！

# 最後の処理を関数でやりたい

良い着眼点ですね！お考えの通り、関数に `profile` を直接渡す形だと、関数の外でデータを取得する必要があり、あまり効率的ではありません。

関数には\*\*「何を探すか（ID）」**と**「どこを探すか（データハンドラ）」\*\*を渡して、**データ取得のロジックを関数内にまとめる**のが最適なアプローチです。

-----

### **解決策**

`id` と `dataHandler` のインスタンスを引数に取る関数を作成します。この関数は、受け取った `dataHandler` を使ってユーザーを検索し、結果を表示する責務を持ちます。

**1. 関数の定義**
以下のような関数を `index.ts` のメイン処理部分（クラス定義の後）に追加します。

```typescript
/**
 * 指定されたIDのユーザー名をコンソールに表示する。
 * ユーザーが見つからない場合は、その旨のメッセージを表示する。
 * @param id 検索するユーザーのID
 * @param handler Profileデータを管理するDataHandlerのインスタンス
 */
function displayUserNameById(id: number, handler: DataHandler<Profile>): void {
  const user = handler.getItemById(id);

  if (user) {
    console.log(`ID:${id} のユーザー名: ${user.name}`);
  } else {
    console.log(`ユーザー(ID: ${id})は見つかりませんでした。`);
  }
}
```

**ポイント：**

  * **引数**: `id: number` と `handler: DataHandler<Profile>` を受け取ります。これで「何」を「どこ」から探すかが明確になります。
  * **戻り値**: `void` になります。この関数は値を返すのではなく、コンソールに表示する（副作用を起こす）ことが目的だからです。
  * **内部ロジック**: データを取得する処理 (`handler.getItemById(id)`) が関数の中にカプセル化（内包）されています。

**2. 関数の呼び出し**
以前 `if/else` を書いていた部分を、この新しい関数を呼び出す形に置き換えます。コードが非常にスッキリします。

```typescript
// 以前のコード
/*
console.log('--- ID 1 のユーザーを検索 ---');
const user = dataHandler.getItemById(1);
if (user) { ... } else { ... }

console.log('--- ID 99 のユーザーを検索 ---');
const userNotFound = dataHandler.getItemById(99);
if (userNotFound) { ... } else { ... }
*/

// 新しいコード（こちらに置き換える）
console.log('--- ユーザー検索処理 ---');
displayUserNameById(1, dataHandler);   // 存在するID
displayUserNameById(2, dataHandler);   // 存在するID
displayUserNameById(99, dataHandler);  // 存在しないID
```

この方法なら、同じ処理を何度も書く必要がなくなり、コードの再利用性が高まります。
「処理を一つのまとまりとして関数に切り出す」というのは、プログラミングにおける非常に重要な考え方です。素晴らしい一歩ですね！👍