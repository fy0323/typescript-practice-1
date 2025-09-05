interface UserProfile {
  id: number;
  name: string;
  email: string;
};


function fetchUserProfile(userId: number): Promise<UserProfile> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('1秒経過');
      if (userId === 1) {
        resolve({ id: 1, name: 'Taro Yamada', email: 'taro@example.com' });
      } else {
        reject(new Error('User not found'));
      };
    }, 1000)
  });
};

async function main(){
  try {
    const user = await fetchUserProfile(1);
    console.log(user);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unnown error occurred.');
    };
  };

  try {
    const user = await fetchUserProfile(2);
    console.log(user);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error occurred.');
    };
  };
};

main();