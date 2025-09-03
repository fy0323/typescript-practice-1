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

class DataHandler<T extends {id: number}> {
  private data: T[] = [];
  addItem(item: T): void {
    this.data.push(item);
  }
  getItemById(id: number): T | undefined {
    return this.data.find(item => item.id === id);
  }
}

function showNameOrMessage(id: number, handler: DataHandler<Profile>){
  const user = handler.getItemById(id);

  if (user) {
    console.log(`ID ${id} の名前は ${user.name} です。`);
  } else {
    console.log(`ID ${id} は見つかりませんでした。`);
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

showNameOrMessage(1, dataHandler);
showNameOrMessage(2, dataHandler);
showNameOrMessage(99, dataHandler);