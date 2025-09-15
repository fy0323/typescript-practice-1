import axios from 'axios';

const userAPI: string = "https://jsonplaceholder.typicode.com/users/";
const postAPI: string = "https://jsonplaceholder.typicode.com/posts?userId=";

interface User {
  id: number;
  name: string;
  email: string;
};

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function getUserData(id: string): Promise<User | undefined>{
  const response = await axios.get<User[]>(userAPI, { params: { id: id }});
  return response.data[0];
}

async function getUserPostData(id: string): Promise<Post[]>{
  const url = `${postAPI}${id}`;
  const response = await axios.get<Post[]>(url);
  return response.data;
}

async function main(){
  const userId = process.argv[2];
  if (!userId){
    console.error('ユーザーIDを指定してください。');
    process.exit(1);
  };
  try {
    const response = await getUserData(userId);
    if (response) {
      console.log(`--- ユーザー情報 ---
名前: ${response.name}
Eメール: ${response.email}`);
    } else {
      console.error("no user info.");
    };

    const postResponse = await getUserPostData(userId);
    if (postResponse) {
      console.log("--- 投稿タイトル一覧 ---")
      for (let i:number = 0; i < 10; i++){
        console.log(` - ${postResponse[i]?.title}`);
      }
    } else {
      console.error("no post info.");
    };
  } catch (error) {
    console.error("failed to get user info", error);
  };
};

main();