# Day5

拝見しました。`async/await`と`try...catch`を使った非同期処理とエラーハンドリング、完璧です！架空のAPIとはいえ、データの取得から失敗時の対応まで一連の流れをしっかり実装できていますね。Day4の課題クリアです！

それでは、いよいよWebアプリケーション開発の核心に迫る5日目の課題です。

-----

### **【5日目】 Webの基本とAPI 〜ブラウザとサーバーの対話〜**

**本日のテーマ**:
今日は、Webアプリケーションがどのように成り立っているかの全体像を掴みます。ブラウザ（フロントエンド）がサーバー（バックエンド）に「このデータが欲しい」と**リクエスト**を送り、サーバーがそのデータを**レスポンス**として返す、この一連の対話が基本です。その対話のルールを定めたものが **HTTPメソッド** であり、対話の窓口が **REST API** です。昨日の `axios` を使い、今度は本物の公開APIを叩いてみましょう。

-----

### **本日の達成目標**

1.  **HTTPメソッド**（特にGET, POST）の基本的な役割を説明できる。
      * **GET**: データを取得する
      * **POST**: 新しいデータを作成する
2.  **REST API** が「URLを通じてリソース（情報）を操作するための設計思想」であることを理解する。
3.  `axios` を使って、外部の公開APIに **GETリクエスト** を送り、JSON形式のデータを取得できる。

-----

### **課題**

日本の郵便番号から住所を検索する、簡単なコマンドラインツールを作成してください。今回は、無料で使える公開APIである「**zipcloud**」を利用します。

**zipcloud APIドキュメント**: [http://zipcloud.ibsnet.co.jp/doc/api](http://zipcloud.ibsnet.co.jp/doc/api)

**要件：**

1.  **プロジェクトのセットアップ**

      * `zipcode-searcher` という名前で新しいディレクトリを作成し、`npm init -y` と TypeScript、`axios` のセットアップを行ってください。

2.  **APIからデータを取得する関数の実装**

      * `getAddress` という名前の `async` 関数を `index.ts` に作成してください。
      * この関数は、引数として郵便番号（`zipcode: string`）を受け取ります。
      * `axios.get()` を使って、zipcloud APIにリクエストを送信します。
          * リクエストURL: `https://zipcloud.ibsnet.co.jp/api/search`
          * URLにクエリパラメータ `zipcode=...` を付与する必要があります。`axios` では `params` オプションを使うと便利です。
            ```typescript
            // axios.get(url, { params: { zipcode: '...' } }) のように指定できます
            ```
      * APIからのレスポンスの型を定義してください。ドキュメントを参考に、最低限必要な `results`（住所情報の配列）だけでも型定義しましょう。
        ```typescript
        interface ZipcodeResponse {
          results: {
            address1: string; // 都道府県
            address2: string; // 市区町村
            address3: string; // 町域
          }[];
        }
        ```
      * API通信が成功したら、取得したデータの中から最初の住所情報（`response.data.results[0]`）を返却します。該当する住所がなければ `null` を返してください。

3.  **実行と結果の表示**

      * `main` という `async` 関数を定義し、その中で `getAddress` を呼び出してください。
      * `'1000001'`（東京都千代田区千代田）と `'9999999'`（存在しない郵便番号）の2パターンで関数を呼び出します。
      * `try...catch` でエラーハンドリングも忘れずに行いましょう。
      * 住所が取得できた場合は、「郵便番号: [郵便番号] の住所は [都道府県][市区町村][町域] です。」という形式でコンソールに表示してください。
      * 住所が取得できなかった場合（`null` が返ってきた場合）は、「該当する住所が見つかりませんでした。」と表示してください。

**提出物:**
上記の要件を満たしたプロジェクト一式を、これまでと同じリポジトリの `day5` ブランチ、または `day5` ディレクトリなどに Push して、URL を教えてください。

-----

この課題は、これまでに学んだTypeScriptの型定義、非同期処理、パッケージ管理の知識を総動員するものになります。外部APIとの連携はアプリケーション開発の基本なので、しっかり流れを掴みましょう。頑張ってください！


# 元の型定義に従う場合

はい、承知いたしました。
関数の型定義を修正せず、あくまで `Promise<ZipcodeResponse>` を返すという当初の宣言を維持したまま動かす場合のコードですね。

その場合、**`getAddress`関数の`return`文**と、**`main`関数でのデータの呼び出し方**を修正する必要があります。

-----

### 修正ポイント

1.  **`getAddress`関数**: この関数は `ZipcodeResponse` 型を返すと宣言しているので、その宣言通り `response.data` 全体を `return` します。`results[0]` のように中身を取り出す処理は行いません。

2.  **`main`関数**: `getAddress` から `ZipcodeResponse` オブジェクト全体が返ってくるので、`response` 変数には `{ results: [...] }` というデータが入ります。そのため、住所情報にアクセスするには `response.results[0].address1` のように、`results` を経由する必要があります。

-----

### 型定義を修正しない場合のコード

```typescript:src/index.ts
import axios from "axios";

// この型定義は変更しない
interface ZipcodeResponse {
  results: {
    address1: string;
    address2: string;
    address3: string;
  }[] | null; // resultsがnullの場合も考慮
}

// getAddress関数の戻り値の型も変更しない
async function getAddress(zipcode: string): Promise<ZipcodeResponse> {
  const url = "https://zipcloud.ibsnet.co.jp/api/search";
  const response = await axios.get<ZipcodeResponse>(url, { params: { zipcode: zipcode } });

  // ★修正ポイント１: response.data全体を返す
  return response.data;
}

async function main() {
  const zipcodeCorrect = '1000001';
  const zipcodeError = '9999999';

  try {
    // response変数には { results: [...] } が入る
    const response = await getAddress(zipcodeCorrect);
    
    // ★修正ポイント２: response.results を経由してデータにアクセスする
    if (response.results && response.results.length > 0) {
      const address = response.results[0]; // 分かりやすいように一度変数に入れる
      console.log(`郵便番号: ${zipcodeCorrect} の住所は ${address.address1}${address.address2}${address.address3} です。`);
    } else {
      console.log(`郵便番号: ${zipcodeCorrect} の住所は見つかりませんでした。`);
    }

    // 存在しない郵便番号のテスト
    const responseError = await getAddress(zipcodeError);
    if (responseError.results && responseError.results.length > 0) {
      const address = responseError.results[0];
      console.log(`郵便番号: ${zipcodeError} の住所は ${address.address1}${address.address2}${address.address3} です。`);
    } else {
      console.log(`郵便番号: ${zipcodeError} の住所は見つかりませんでした。`);
    }

  } catch (error) {
    console.error("APIの取得に失敗しました。", error);
  }
}

main();
```

このように、関数の型定義と実際の返り値を一致させることで、呼び出し側のコードは変わりますが、矛盾なく動作させることができます。

どちらのアプローチが良いかは状況によりますが、**関数が本当に返したいものが何か**を考えて型を付けるのが一般的です。今回の場合は「住所情報が欲しい」ので、最初に提案した「`Promise<Address | null>` を返す」方が関数の意図が明確になりやすいと言えます。


# よりよい型定義を使う場合

ご質問ありがとうございます。これはTypeScriptを学ぶ上でとても良いポイントです！

結論から言うと、**`getAddress`関数の戻り値の型定義と、実際に`return`している値の型が異なっている**ことが原因です。

-----

### 原因

`getAddress`関数はこのように定義されています。

```typescript
// この関数は「ZipcodeResponse型」を返すと宣言している
async function getAddress(zipcode: string): Promise<ZipcodeResponse> {
  // ...
  // しかし、実際に返しているのは「results配列の0番目の要素」
  return response.data.results[0];
};
```

`ZipcodeResponse`型は `{ results: [...] }` という形をしていますが、`response.data.results[0]` は `{ address1: '...', address2: '...', ... }` という**中身のオブジェクト**です。

そのため、`main`関数で`getAddress`を呼び出した結果、変数`response`にはすでに住所オブジェクトそのものが入っています。

`console.log(response)`の実行結果がそれを証明していますね。

```
{
  address1: '東京都', // response.address1 でアクセスできる
  address2: '千代田区', // response.address2 でアクセスできる
  address3: '千代田', // response.address3 でアクセスできる
  ...
}
```

この`response`オブジェクトには `results` というプロパティは存在しないため、`response.results[0]`のようにアクセスしようとするとエラーになります。

-----

### 解決策

`main`関数内の`response`変数には、すでに欲しい住所オブジェクトが入っているので、プロパティに直接アクセスするだけで大丈夫です。

さらに、この機会にコード全体の型定義をより正確に修正してみましょう。

1.  **住所オブジェクトの型を定義する**
    `results`配列の中身のオブジェクトにも、`Address`のような名前で型を付けてあげると、コードが読みやすくなります。

2.  **`getAddress`関数の戻り値の型を修正する**
    この関数が実際に返すのは`Address`オブジェクト（または見つからない場合の`null`）なので、そのように修正します。

#### 修正後のコード全体

```typescript:src/index.ts
import axios from "axios";

// 1. APIレスポンス全体の型
interface ZipcodeResponse {
  results: Address[] | null; // resultsが見つからない場合もあるのでnull許容にする
}

// 2. 住所情報オブジェクトの型
interface Address {
  address1: string;
  address2: string;
  address3: string;
}

// 3. getAddress関数の戻り値の型を「Address | null」に修正
async function getAddress(zipcode: string): Promise<Address | null> {
  const url = "https://zipcloud.ibsnet.co.jp/api/search";
  // APIからのレスポンスの型を<ZipcodeResponse>として指定する
  const response = await axios.get<ZipcodeResponse>(url, { params: { zipcode: zipcode } });

  // resultsが存在し、かつ配列の長さが0より大きい場合
  if (response.data.results && response.data.results.length > 0) {
    return response.data.results[0]; // 最初の住所オブジェクトを返す
  } else {
    return null; // 見つからない場合はnullを返す
  }
}

async function main() {
  const zipcodeCorrect = '1000001';
  const zipcodeError = '9999999';

  try {
    const address = await getAddress(zipcodeCorrect);
    if (address) {
      // 4. addressオブジェクトのプロパティに直接アクセスする
      console.log(`郵便番号: ${zipcodeCorrect} の住所は ${address.address1}${address.address2}${address.address3} です。`);
    } else {
      console.log(`郵便番号: ${zipcodeCorrect} の住所は見つかりませんでした。`);
    }

    // 存在しない郵便番号のテスト
    const addressError = await getAddress(zipcodeError);
    if (addressError) {
      console.log(`郵便番号: ${zipcodeError} の住所は ${addressError.address1}${addressError.address2}${addressError.address3} です。`);
    } else {
      console.log(`郵便番号: ${zipcodeError} の住所は見つかりませんでした。`);
    }

  } catch (error) {
    console.error("APIの取得に失敗しました。", error);
  }
}

main();
```

この修正で、関数の宣言と実態が一致し、より安全で分かりやすいコードになりました。素晴らしい疑問点でした！

# Generics

これはTypeScriptの\*\*ジェネリクス（Generics）\*\*という機能です。

一言で言うと、**「`axios.get`が受け取るAPIレスポンスの`data`プロパティの『型』は`ZipcodeResponse`ですよ」とTypeScriptに教えてあげるための記述**です。

-----

### なぜこれが必要なのか？

`axios`ライブラリ自体は、あなたがどんなAPIを叩くのか、そのAPIがどんな形のJSONを返すのかを知りません。そのため、`<ZipcodeResponse>`を指定しない場合、TypeScriptはレスポンスデータの型を安全な`any`型（なんでもありの型）として扱います。

**`<ZipcodeResponse>`を指定しない場合（良くない例）**

```typescript
// response.data は 'any' 型になる
const response = await axios.get(url, { params: { zipcode: zipcode } });

// TypeScriptは response.data の中身を知らない
// ・エディタの入力補完が効かない
// ・もし `response.data.result` のようにタイポしてもエラーにならない
console.log(response.data.results); 
```

これでは、せっかくTypeScriptを使っているのに型の恩恵を受けられません。

-----

### `<ZipcodeResponse>`を指定するメリット

そこでジェネリクスを使い、レスポンスデータの型を明示します。

**`<ZipcodeResponse>`を指定した場合（良い例）**

```typescript
// response.data は 'ZipcodeResponse' 型になる
const response = await axios.get<ZipcodeResponse>(url, { params: { zipcode: zipcode } });

// TypeScriptは response.data の中身を完全に理解している
// ・入力補完が効く: `response.data.` と打つと `results` が候補に出る
// ・型チェックが効く: `response.data.result` とタイポすると即座にエラーで教えてくれる
console.log(response.data.results);
```

### 例えるなら「荷物のラベル」

  * **ジェネリクスなし**: 宛名のない荷物（`any`）が届くようなものです。開けてみるまで中身が何か分からず、手探りで扱わなければなりません。🤔
  * **ジェネリクスあり**: 「本（`ZipcodeResponse`）」と書かれたラベル付きの荷物が届くようなものです。あなたは中身が本だと分かっているので、自信を持って本棚にしまったり、ページをめくったりできます。👍

このように、`<ZipcodeResponse>`は、外部APIから来る「型のないデータ」に、あなたのプログラム内で使える「しっかりとした型」を与えるための重要な記述です。

