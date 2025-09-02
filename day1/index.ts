type Profile = {
  name: string;
  affiliation: string;
  experienceYears: number;
  interestedTechnologies: string[];
};

const myProfile: Profile = {
  name: "Yamaji",
  affiliation: "Test compnay",
  experienceYears: 8,
  interestedTechnologies: ["Cloud", "Container", "TypeScript"],
};

function createIntroduction(profile: Profile): string {
  return `
    こんにちは、${profile.affiliation}の${profile.name}です。
    ITインフラの経験が${profile.experienceYears}年あります。
    現在、${profile.interestedTechnologies}に興味があります。
  `;
};

console.log(createIntroduction(myProfile));