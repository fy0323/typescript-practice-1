import axios from 'axios';

const url = 'https://zipcloud.ibsnet.co.jp/api/search'

interface ZipcodeResponse {
  results: {
    address1: string;
    address2: string;
    address3: string;
  }[];
};

async function getAddress(zipcode: string): Promise<ZipcodeResponse> {
  const response = await axios.get<ZipcodeResponse>(url, { params: { zipcode: zipcode } });
  return response.data;
};

async function main(){
  const zipcodeCorrect = '1000001';
  const zipcodeError = '9999999';
  try {
    const response = await getAddress(zipcodeCorrect);
    if (response) {
      console.log(`郵便番号: ${zipcodeCorrect} の住所は${response.results[0]?.address1}${response.results[0]?.address2}${response.results[0]?.address3} です。`);
    } else {
      console.error(`郵便番号: ${zipcodeError} の住所は見つかりませんでした。`);
    };
  } catch (error){
    console.error("APIの取得に失敗しました。", error);
  };

  try {
    const response = await getAddress(zipcodeError);
    if (response) {
      console.log(`郵便番号: ${zipcodeCorrect} の住所は${response.results[0]?.address1}${response.results[0]?.address2}${response.results[0]?.address3} です。`);
    } else {
      console.error(`郵便番号: ${zipcodeError} の住所は見つかりませんでした。`);
    };
  } catch (error) {
    console.error("APIの取得に失敗しました。", error);
  };
};

main();

/* 型定義をより正確にする場合

interface ZipcodeResponse {
  results: Address[] | null;
};

interface Address {
  address1: string;
  address2: string;
  address3: string;
};

async function getAddress(zipcode: string): Promise<Address | null>{
  const response = await axios.get<ZipcodeResponse>{url, { params: { zipcode: zipcode }}};
  if (response.data.results && response.data.results.length > 0){
    return response.data.results[0];
  } else {
    return null;
  };
};

async function main(){
  const zipcodeCorrect = '1000001';
  const zipcodeError = '9999999';

  try {
    const address = await getAddress(zipcodeCorrect);
    if (address) {
      console.log('correct data');
    } else {
      console.log('error message');
    };

    const addressError = await getAddress(zipcodeError);
    if (addressError) {
      console.log('correct data');
    } else {
      console.log('error message');
    };
  } catch (error) {
    console.error('error', error);
  };
};

*/