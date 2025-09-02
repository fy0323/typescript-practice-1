import { profile } from "console";

type Profile = {
  id: number;
  name: string;
  affiliation: string;
  experienceYears: number;
  interestedTechnologies: string[];
};

type JobHistory = {
  companyName: string;
  role: string;
};

type ProfileWithHistory = Profile & JobHistory

class DataHandler<T> {
  private data: T[] = [];
  addItem(item: T): void {
    this.data.push(item);
  }
  getItemById(id: number): T | undefined {
    return this.data[id];
  }
}

const dataHandler = new DataHandler<Profile>()

const myProfile: Profile = {
  id: 1,
  name: "Yamaji",
  affiliation: "Test compnay",
  experienceYears: 8,
  interestedTechnologies: ["Cloud", "Container", "TypeScript"],
};

const anotherProfile: Profile = {
  id: 2,
  name: "Tanaka",
  affiliation: "Test company 2",
  experienceYears: 5,
  interestedTechnologies: ["On-Prem", "Frontend"],
};

dataHandler.addItem(myProfile);
dataHandler.addItem(anotherProfile);

// TODO: dataHandlerの配列インデックスでなくProfile IDを指定して名前を表示できるようにする
// TODO: IDが存在するときは名前を、存在しないときは"${id}は存在しません"という文字列を返す
console.log(dataHandler.getItemById(0)?.name)
console.log(dataHandler.getItemById(1)?.name)
console.log(dataHandler.getItemById(99)?.name)

