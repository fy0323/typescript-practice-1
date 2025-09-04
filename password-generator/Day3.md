# Day3

確認しました。`displayUserNameById` 関数もきれいに実装されており、Day2の課題は完璧にクリアです！ジェネリクス制約という少し難しい概念をしっかり使いこなせていますね。素晴らしいです。

それでは、3日目のテーマと課題に進みましょう。

---
### **【3日目】 JSエコシステム 〜Node.jsとパッケージ管理〜**

**本日のテーマ**:
今日は一度フロントエンドから離れ、TypeScript/JavaScriptを動かす環境そのものである **Node.js** と、そのエコシステムを支えるパッケージマネージャー **npm/yarn** に焦点を当てます。Pythonにおける`pip`や`venv`、Goにおける`go mod`に相当するものです。なぜ `package.json` が必要なのか、どうやって便利なライブラリ（パッケージ）を自分のプロジェクトに追加するのかを学び、サーバーサイド開発への足がかりとします。

---
### **本日の達成目標**

1.  **Node.js** の役割が「ブラウザの外でJavaScriptを実行するための環境」であることを説明できる。
2.  **npm** (または **yarn**) を使って、プロジェクトの初期化 (`npm init`) ができる。
3.  `package.json` ファイルが持つ役割（特に `dependencies` と `devDependencies`）を説明できる。
4.  外部パッケージをプロジェクトにインストール (`npm install`) し、コード内で `import` して利用できる。

---
### **課題**

コマンドラインで実行する、シンプルな「パスワード生成ツール」を作成してください。

**要件：**

1.  **プロジェクトのセットアップ**
    * `password-generator` という名前で新しいディレクトリを作成し、その中で `npm init -y` を実行して `package.json` を作成してください。
    * TypeScript と ts-node を開発用依存関係 (`devDependencies`) としてインストールしてください。
        * `npm install -D typescript ts-node @types/node`

2.  **外部パッケージの利用**
    * ランダムな文字列を生成するのに便利な `nanoid` というパッケージを、本番用依存関係 (`dependencies`)としてインストールしてください。
        * `npm install nanoid`
    * `nanoid` の使い方を公式ドキュメント（[https://github.com/ai/nanoid](https://github.com/ai/nanoid)）で調べ、TypeScriptでどのように `import` するか確認してください。

3.  **パスワード生成関数の実装**
    * `generatePassword` という関数を `index.ts` に作成してください。
    * この関数は、生成したいパスワードの**長さ**（`length`）を引数として受け取ります。デフォルト値は `12` に設定してください。
    * 関数内部で、インストールした `nanoid` を使って指定された長さのランダムな文字列を生成し、返却します。
        * ヒント: `nanoid` はデフォルトだと21文字で生成します。引数で長さを指定する方法を調べてみましょう。

4.  **実行と結果の表示**
    * `generatePassword` 関数を**引数なし**で呼び出し、生成されたパスワードをコンソールに表示してください。（デフォルトの12文字で生成されるはずです）
    * `generatePassword` 関数に**引数 `20`** を渡して呼び出し、生成されたパスワードをコンソールに表示してください。
    * `package.json` の `scripts` に、`"start": "ts-node src/index.ts"` を追加し、`npm start` コマンドでプログラムを実行できるようにしてください。

**提出物:**
上記の要件を満たしたプロジェクト一式を、これまでと同じリポジトリの `day3` ブランチ、または `day3` ディレクトリなどに Push して、URL を教えてください。

---
この課題を通じて、外部の優れたライブラリを自分のプロジェクトに組み込む方法を学びます。これができると、車輪の再発明をせずに、効率よく開発を進めることができるようになります。頑張ってください！

# 関数の引数にデフォルト値を付ける

TypeScriptの関数の引数を必須でない（オプショナルな）ものにするには、引数名の後ろに疑問符（`?`）をつけます。

### オプショナル引数の書き方

引数の名前と型の間に`?`を挿入することで、その引数は省略可能になります。

```typescript
// `age`はオプショナルな引数
function greet(name: string, age?: number) {
  if (age) {
    console.log(`Hello, my name is ${name} and I am ${age} years old.`);
  } else {
    console.log(`Hello, my name is ${name}.`);
  }
}

greet("Alice");      // OK, `age`は省略可能
greet("Bob", 30);    // OK, `age`が提供される
// greet("Charlie", "twenty"); // エラー, `age`はnumber型である必要がある
```

この例では、`age?`と書くことで、`age`引数がなくても`greet`関数を呼び出せるようになります。もし引数が提供されない場合、その値は自動的に`undefined`になります。

-----

### デフォルト引数

オプショナル引数に似た別の方法として、デフォルト引数を使うこともできます。これは、引数が提供されなかった場合に、あらかじめ指定した値が使われるようにするものです。

```typescript
// `greeting`にデフォルト値を設定
function sayHello(name: string, greeting: string = "Hello") {
  console.log(`${greeting}, ${name}!`);
}

sayHello("Dave");       // 出力: Hello, Dave!
sayHello("Eve", "Hi");  // 出力: Hi, Eve!
```

**オプショナル引数**は、その引数が`undefined`になることを許容する場合に使い、**デフォルト引数**は、引数が省略されたときに特定の値を使いたい場合に便利です。
