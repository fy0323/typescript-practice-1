# Day7

Day6の課題、拝見しました。Expressサーバーの基本形が完璧に実装できていますね！`npm start`でサーバーを起動し、ブラウザで意図したJSONが表示される流れをしっかり掴めています。素晴らしいです。

さて、今日で第1週は最終日です。この1週間で学んだ知識を総動員して、少し大きめの課題に挑戦してみましょう。

-----

### **【7日目】 週次レビュー 〜ここまでの知識を総動員する〜**

**本日のテーマ**:
今週はTypeScriptの型、Node.jsの環境、非同期処理、APIの利用と作成、といったWebアプリ開発の基礎を幅広く学びました。今日はその総仕上げとして、**ここまでの知識を全て組み合わせた**一つの小さなアプリケーションを完成させます。バラバラだった知識が繋がり、一本の線になる感覚を掴むことが目標です。

-----

### **本日の達成目標**

1.  コマンドラインから引数を受け取ることができる。
2.  複数の非同期処理（APIリクエスト）を順番に実行できる。
3.  複数のAPIから取得した情報を組み合わせて、意味のある形でユーザーに表示できる。
4.  これまでに作成した`type`や`interface`、`async/await`、`axios`といった知識を迷わず使いこなせる。

-----

### **課題**

特定のユーザーIDをコマンドラインから受け取り、そのユーザーの情報と、そのユーザーが書いたブログ投稿のタイトル一覧を表示するCLI（コマンドラインインターフェース）ツールを作成してください。

データの取得には、テスト用の公開APIである **JSONPlaceholder** を利用します。

  * ユーザー情報取得API: `https://jsonplaceholder.typicode.com/users/{ユーザーID}`
  * 投稿情報取得API: `https://jsonplaceholder.typicode.com/posts?userId={ユーザーID}`

**要件：**

1.  **プロジェクトのセットアップ**

      * `cli-post-viewer` のような名前でプロジェクトをセットアップし、`typescript`, `ts-node`, `@types/node`, `axios` をインストールしてください。

2.  **コマンドライン引数の受け取り**

      * `ts-node src/index.ts 1` のように実行した際に、`1` の部分をユーザーIDとして受け取れるようにしてください。
      * もし引数が指定されていない場合は、「ユーザーIDを指定してください。」と表示してプログラムを終了してください。

3.  **API通信とデータ処理**

      * まず、受け取ったユーザーIDを使ってユーザー情報取得APIを叩き、ユーザーの情報を取得します。
      * 次に、同じユーザーIDを使って投稿情報取得APIを叩き、そのユーザーの投稿一覧（配列）を取得します。
      * 取得したデータを使って、最終的に以下のような形式でコンソールに表示してください。
        ```
        --- ユーザー情報 ---
        名前: Leanne Graham
        Eメール: Sincere@april.biz

        --- 投稿タイトル一覧 ---
         - sunt aut facere repellat provident occaecati excepturi optio reprehenderit
         - qui est esse
         - ea molestias quasi exercitationem repellat qui ipsa sit aut
         ... (以下続く)
        ```

4.  **エラーハンドリング**

      * APIリクエストが失敗した場合や、指定したIDのユーザーが存在しなかった場合に備え、`try...catch` を使って適切にエラーメッセージを表示してください。

**提出物:**
上記の要件を満たしたプロジェクト一式を、これまでと同じリポジトリの `day7` ブランチ、または `day7` ディレクトリなどに Push して、URL を教えてください。

-----

### **ヒント (動作確認済みのコード例)**

#### **1. コマンドライン引数の取得方法**

Node.jsでは `process.argv` という配列で引数を取得できます。

```typescript
// process.argv[0] は 'ts-node'
// process.argv[1] は実行ファイルパス 'src/index.ts'
// process.argv[2] が最初の引数になる
const userId = process.argv[2];

if (!userId) {
  console.error('ユーザーIDを指定してください。');
  process.exit(1); // エラーでプログラムを終了
}

console.log(`指定されたID: ${userId}`);
```

#### **2. APIレスポンスの型定義**

JSONPlaceholderが返すデータ構造に合わせた、正確な`interface`の例です。これを活用してください。

```typescript
// ユーザー情報の型 (必要なものだけ抜粋)
interface User {
  id: number;
  name: string;
  email: string;
}

// 投稿情報の型
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
```

この1週間、本当にお疲れ様でした！この課題がクリアできれば、Webアプリ開発の基礎体力は十分に身についたと言えます。自信を持って取り組んでください。応援しています！


# User[]を使うこと

## エラーの原因

このエラーは、TypeScriptが`response.data`が`User`型であり、`User`型には`0`というインデックス（配列の要素のようなアクセス方法）が存在しないことを伝えています。

`axios.get<User>(...)` と型を指定しても、APIからのレスポンスが常に`User`型そのものになるとは限りません。APIはしばしば、`User`オブジェクトの配列や、`User`オブジェクトをプロパティに持つ別のオブジェクトを返すことがあります。

エラーメッセージ `Property '0' does not exist on type 'User'.` は、`response.data`が`User`型であり、`User`型には`0`というプロパティ（配列のインデックスとして使われるもの）がない、ということを明確に示しています。

## 解決策

APIから返されるデータの実際の構造に合わせて、TypeScriptの型定義を調整する必要があります。

### 1\. APIのレスポンス構造を確認する

まず、APIがどのような形式でデータを返しているかを正確に把握することが重要です。

  * APIは`User`オブジェクトそのものを配列で返していますか？（例: `[{ id: 1, name: '...' }, { id: 2, name: '...' }]`）
  * それとも、`User`オブジェクトをプロパティに持つ別のオブジェクトを返していますか？（例: `{ users: [{ id: 1, name: '...' }], count: 1 }`）

APIのドキュメントを確認するか、実際にAPIを叩いてレスポンスの構造を見てみましょう。

### 2\. 型定義を修正する

APIのレスポンス構造に応じて、以下のいずれかの方法で型定義を修正します。

#### ケースA: APIがUserオブジェクトの配列を返す場合

もしAPIが`User`オブジェクトの配列を返している場合（例: `[{ id: 1, name: '...' }, { id: 2, name: '...' }]`）、`axios.get`の型引数と関数の戻り値の型を`User[]`とします。

```typescript
// User型が定義されていると仮定します
interface User {
  id: number;
  name: string;
  email: string;
  // ... 他のプロパティ
}

async function getUserData(userId: number): Promise<User | undefined> { // 戻り値をUser | undefined に変更
  const response = await axios.get<User[]>(userAPI, { params: { id: userId } }); // 型引数をUser[]に変更
  // 配列から特定のIDのユーザーを見つける (findメソッドを使用)
  // または、単純に配列の最初の要素を取得する場合
  return response.data[0]; // 0番目の要素を取得
}
```

#### ケースB: APIがUserオブジェクトをプロパティに持つオブジェクトを返す場合

もしAPIが`{ user: { id: 1, name: '...' } }`のような構造で返している場合、それに対応するインターフェースを定義します。

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  // ... 他のプロパティ
}

// APIのレスポンス構造を表すインターフェース
interface UserApiResponse {
  user: User;
  // ... 他のプロパティがある場合
}

async function getUserData(userId: number): Promise<User | undefined> {
  // axios.getの型引数をAPIのレスポンス構造に合わせる
  const response = await axios.get<UserApiResponse>(userAPI, { params: { id: userId }});
  // APIのレスポンス構造に合わせてUserオブジェクトを取得する
  return response.data.user;
}
```

#### ケースC: APIがUserオブジェクトそのものを返す場合 (最もシンプル)

もしAPIが本当に`User`オブジェクトだけを直接返している（例: `{ id: 1, name: '...' }`）のであれば、`axios.get`の型引数と関数の戻り値の型は`User`のままで大丈夫です。この場合、`response.data[0]`ではなく`response.data`に直接アクセスします。

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  // ... 他のプロパティ
}

async function getUserData(userId: number): Promise<User | undefined> { // 戻り値をUser | undefined に変更
  const response = await axios.get<User>(userAPI, { params: { id: userId }});
  // response.dataはUser型そのものなので、[0]でアクセスしない
  // もし、userIdが必須で必ず取得できるなら、User型で良い
  // 取得できない可能性もあるなら、User | undefined とする
  return response.data;
}
```

この場合、`getUserData`関数の戻り値の型を`Promise<User | undefined>`に変更し、APIからのレスポンスがnullやundefinedになる可能性も考慮すると、より安全なコードになります。

-----

**最も重要なのは、APIが返しているデータの構造を正確に把握し、それに応じたTypeScriptの型定義を行うことです。**

# for文の書き方

[TypeScript for文](https://recursionist.io/learn/languages/typescript/control-flow/for-statement)

# 実行ログ

```sh
npm start

> cli-post-viewer@1.0.0 start
> ts-node src/index.ts

ユーザーIDを指定してください。

npm start 1

> cli-post-viewer@1.0.0 start
> ts-node src/index.ts 1

--- ユーザー情報 ---
名前: Leanne Graham
Eメール: Sincere@april.biz
--- 投稿タイトル一覧 ---
 - sunt aut facere repellat provident occaecati excepturi optio reprehenderit
 - qui est esse
 - ea molestias quasi exercitationem repellat qui ipsa sit aut
 - eum et est occaecati
 - nesciunt quas odio
 - dolorem eum magni eos aperiam quia
 - magnam facilis autem
 - dolorem dolore est ipsam
 - nesciunt iure omnis dolorem tempora et accusantium
 - optio molestias id quia eum

npm start 2

> cli-post-viewer@1.0.0 start
> ts-node src/index.ts 2

--- ユーザー情報 ---
名前: Ervin Howell
Eメール: Shanna@melissa.tv
--- 投稿タイトル一覧 ---
 - et ea vero quia laudantium autem
 - in quibusdam tempore odit est dolorem
 - dolorum ut in voluptas mollitia et saepe quo animi
 - voluptatem eligendi optio
 - eveniet quod temporibus
 - sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio
 - fugit voluptas sed molestias voluptatem provident
 - voluptate et itaque vero tempora molestiae
 - adipisci placeat illum aut reiciendis qui
 - doloribus ad provident suscipit at
```