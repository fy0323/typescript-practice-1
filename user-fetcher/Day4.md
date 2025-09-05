# Day4
拝見しました。`nanoid` パッケージを正しくインストール・import し、`package.json` の `scripts` も設定できていますね。Day3の課題クリアです、お疲れ様でした！

npm を使ったパッケージ管理は、現代のWeb開発の基本中の基本なので、しっかりマスターしておきましょう。

それでは、4日目の課題に進みます。今日はアプリ開発において避けては通れない「非同期処理」です。

-----

### **【4日目】 非同期処理 〜Promiseとasync/await〜**

**本日のテーマ**:
Webアプリケーションは、外部APIからのデータ取得やデータベースへの問い合わせなど、「完了するまでに時間がかかる処理」を頻繁に扱います。これらの処理を待っている間も他の処理を止めずに実行するための仕組みが**非同期処理**です。今日は、その中核をなす **Promise** と、それをさらに直感的に書けるようにした **`async/await`** 構文をマスターします。

-----

### **本日の達成目標**

1.  **同期的処理**と**非同期処理**の違いを説明できる。
2.  **Promise** が「未来に完了する処理とその結果を表すオブジェクト」であることを理解する。
3.  `Promise` の `.then()` と `.catch()` を使って、成功時と失敗時の処理を記述できる。
4.  **`async/await`** 構文を使って、非同期処理を同期処理のような見た目でシンプルに記述できる。

-----

### **課題**

架空のユーザー情報を取得するAPIと通信する、簡単なコマンドラインプログラムを作成してください。

**要件：**

1.  **プロジェクトのセットアップ**

      * `user-fetcher` という名前で新しいディレクトリを作成し、`npm init -y` と TypeScript のセットアップを行ってください。
      * API通信を行うために、`axios` という非常に人気のあるHTTPクライアントライブラリをインストールしてください。
          * `npm install axios`

2.  **架空のAPI関数を実装する**

      * 実際には外部に通信せず、非同期処理をシミュレートする関数 `fetchUserProfile` を `index.ts` に作成します。
      * この関数は、引数として `userId: number` を受け取ります。
      * 関数は `Promise` を返します。
      * 内部で `setTimeout` を使い、1秒後に処理が完了するようにシミュレートします。
      * `userId` が `1` の場合は、成功（`resolve`）として以下のユーザーオブジェクトを返します。
        ```typescript
        { id: 1, name: 'Taro Yamada', email: 'taro@example.com' }
        ```
      * `userId` が `1` 以外の場合は、失敗（`reject`）として `new Error('User not found')` を返します。

3.  **async/await を使ってデータを取得・表示する**

      * `main` という名前の `async` 関数を定義してください。
      * `main` 関数の中で、`try...catch` ブロックを使ってエラーハンドリングを行ってください。
      * `try` ブロックの中で、`await` を使って `fetchUserProfile(1)` を呼び出し、結果のユーザーオブジェクトを取得してください。
      * 取得したユーザーの名前とEメールをコンソールに表示してください。
      * 次に、`await` を使って `fetchUserProfile(2)` を呼び出してみてください。（こちらは失敗するはずです）
      * `catch` ブロックの中で、`reject` されたエラーオブジェクトを `console.error()` で表示してください。

4.  **実行**

      * `main()` を呼び出してプログラムを実行してください。
      * `package.json` の `scripts` も設定し、`npm start` で実行できるようにしておきましょう。

**提出物:**
上記の要件を満たしたプロジェクト一式を、これまでと同じリポジトリの `day4` ブランチ、または `day4` ディレクトリなどに Push して、URL を教えてください。

-----

**ヒント:**
`Promise` を自作する際の基本形は以下のようになります。

```typescript
function someAsyncFunction(): Promise<string> {
  return new Promise((resolve, reject) => {
    // 時間のかかる処理...
    if (/* 成功した場合 */) {
      resolve('成功した結果のデータ');
    } else {
      reject(new Error('失敗した理由'));
    }
  });
}
```

この課題を通して、時間がかかる処理を安全かつ直感的に扱う方法を学びましょう。これはフロントエンドでもバックエンドでも必須のスキルです。頑張ってください！

# エラー対応: 返り値用にinterfaceを用意

はい、良いところに気づかれましたね！エラーの原因はまさにお考えの通り、**関数の返り値の型定義と、実際に `resolve` で返している値の型が一致していない**ことです。

現在のコードでは、関数の返り値の型を `Promise<string>` と定義しています。
これは「このPromiseは、成功した暁には\*\*文字列（string）\*\*を返します」という宣言です。

しかし、`resolve` の部分では、 `{ id: 1, name: '...', email: '...' }` という**オブジェクト**を返しています。

TypeScriptは、この「宣言（string）」と「実態（object）」の矛盾を見つけて、「型が違いますよ！」とエラーを出してくれているわけです。

-----

## 解決策

ユーザー情報のオブジェクトに対応する**型**を作成し、それを `Promise` の型引数（`< >`の中）に指定します。

1.  まず、ユーザープロフィールを表す型（`interface` or `type`）を定義します。

    ```typescript
    interface UserProfile {
      id: number;
      name: string;
      email: string;
    }
    ```

2.  次に、`fetchUserProfile` 関数の返り値の型を、この新しい型を使った `Promise<UserProfile>` に修正します。

-----

### 修正後のコード

```typescript:src/index.ts
// ユーザーの型を定義
interface UserProfile {
  id: number;
  name: string;
  email: string;
}

// 関数の返り値の型を Promise<UserProfile> に修正
function fetchUserProfile(userId: number): Promise<UserProfile> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('APIからデータを取得中...');
      if (userId === 1) {
        // resolveに渡すオブジェクトが UserProfile 型と一致している
        resolve({ id: 1, name: 'Taro Yamada', email: 'taro@example.com' });
      } else {
        reject(new Error('User not found'));
      }
    }, 1000);
  });
}

// main関数内での user の型も自動的に UserProfile になります
async function main() {
  try {
    console.log('--- ユーザーID: 1 の情報を取得 ---');
    const user = await fetchUserProfile(1); // user は UserProfile 型
    console.log(`名前: ${user.name}, Eメール: ${user.email}`);
  } catch (error) {
    console.error(error.message);
  }

  try {
    console.log('\n--- ユーザーID: 2 の情報を取得 ---');
    const user = await fetchUserProfile(2);
    console.log(`名前: ${user.name}, Eメール: ${user.email}`);
  } catch (error) {
    // any型を避けるために型ガードを行うとより安全です
    if (error instanceof Error) {
      console.error(`エラー: ${error.message}`);
    } else {
      console.error('予期せぬエラーが発生しました', error);
    }
  }
}

main();
```

このように、非同期処理で扱うデータの「形」を型として定義し、`Promise<T>` の `T` に指定することで、TypeScriptの強力な型チェックの恩恵を最大限に受けることができます。`await` で受け取った変数 (`user`) にカーソルを合わせると、エディタが `UserProfile` 型だと認識してくれるはずです。

素晴らしいエラーの発見でした！これはTypeScriptを使いこなす上で非常に重要なステップです。👍

# try/catchでのerrorの扱い方

その通り、そのエラーはTypeScriptが意図的に表示しているものです。`error`はTypeScriptが備えているものではない、というよりも、TypeScriptが**エラーの型を特定できない**ため、安全のために`unknown`型として扱っていることが原因です。

-----

### エラーの原因

JavaScriptの`try...catch`構文では、`catch`ブロックの`error`変数は**どんな型の値でも受け取ることができます**。これは、エラーが文字列、数値、オブジェクト、あるいは`undefined`など、何であっても捕捉できることを意味します。

TypeScriptは、このJavaScriptの柔軟性が型安全性の穴になることを知っています。そのため、`catch`ブロックの`error`変数はデフォルトで\*\*`unknown`型\*\*と見なされます。

`unknown`型は、TypeScriptの型システムで最も安全な型の一つです。`unknown`型の変数に対しては、**型を特定するチェックを行うまで、いかなる操作（例: `error.message`へのアクセス）も許可されません**。これにより、存在しないプロパティにアクセスすることによる実行時エラーを防いでいます。

今回のエラー`Property 'message' does not exist on type 'unknown'.`は、`error`が`unknown`型なので、`.message`プロパティが確実に存在するかどうかわからない、とTypeScriptが警告しているものです。

### 解決方法

`error`が`Error`オブジェクトであることをTypeScriptに教える必要があります。これにはいくつかの方法があります。

#### 1\. 型ガードを使用する（推奨）

最も安全で一般的な方法は、`instanceof`演算子を使って、`error`が`Error`型のインスタンスであることを実行時に確認することです。

```typescript
async function main() {
  try {
    const user = await fetchUserProfile(1);
    console.log(user);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message); // エラーオブジェクトなので`.message`に安全にアクセスできる
    } else {
      console.error('An unknown error occurred.'); // Error型でなければ別の処理を行う
    }
  }
}
```

#### 2\. 型アサーションを使用する

`as`キーワードを使って、開発者が明示的に型を「断言」する方法です。これは、あなたが`error`が`Error`オブジェクトであることを知っている場合にのみ使用すべきです。

```typescript
async function main() {
  try {
    const user = await fetchUserProfile(1);
    console.log(user);
  } catch (error) {
    // `error`がErrorオブジェクトであることを断言する
    console.error((error as Error).message);
  }
}
```

この方法は簡潔ですが、もし`error`が`Error`オブジェクトでなかった場合、実行時エラーになる可能性があるため注意が必要です。

TypeScriptが`catch`ブロックの`error`に`unknown`型を割り当てるのは、安全なコードを書くための**意図的な設計**です。この挙動を理解し、適切に型チェックを行うことで、より堅牢なプログラムを作成できます。

# package.json scriptへの書き方

`npm start`コマンドを実行すると、`npm`が自動的に**`prestart`という名前のスクリプトを探して、`start`スクリプトの前に実行する**からです。

これは、`npm`の**ライフサイクルスクリプト**という機能によるものです。`npm`には、特定の主要なスクリプト（`start`, `test`, `install`など）の前後に実行される、プレフィックス（接頭辞）付きのスクリプトがあります。

* **`pre`**スクリプト: 主要なスクリプトの**前に**実行されます（例: `prestart`, `pretest`）。
* **`post`**スクリプト: 主要なスクリプトの**後に**実行されます（例: `poststart`, `posttest`）。

あなたの`package.json`では、`start`スクリプトの前に`prestart`が定義されているため、`npm start`コマンドを実行した際に以下の順序で実行されます。

1.  `npm`が`prestart`スクリプトを検知。
2.  `prestart`スクリプト（`ts-node index.ts`）を実行。
3.  `prestart`が完了した後、`start`スクリプト（`node dist/index.js`）を実行。

この機能は、ビルドや設定の準備など、主要なタスクの前に必要な処理を自動化するのに非常に便利です。

