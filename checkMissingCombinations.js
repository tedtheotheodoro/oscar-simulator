import endings from "./endings.js"; 

const profiles = ["actor", "writer"];
const projects = ["indie", "streaming"];
const ads = ["accept_ads", "decline_ads"];
const buzz = ["critics", "audience", "both"];
const careers = ["blockbuster", "cult", "streaming"];

const getMissingCombinations = (results) => {
  const missing = [];

  profiles.forEach(profile => {
    projects.forEach(project => {
      ads.forEach(ad => {
        buzz.forEach(b => {
          careers.forEach(career => {
            const key = `${profile}|${project}|${ad}|${b}|${career}`;
            if (!results.hasOwnProperty(key)) {
              missing.push(key);
            }
          });
        });
      });
    });
  });

  console.log(`🔎 Total combinations: 72`);
  console.log(`✅ Found: ${72 - missing.length}`);
  console.log(`❌ Missing: ${missing.length}`);
  console.log("🔻 Missing combinations:");
  console.table(missing);
};

getMissingCombinations(endings);
