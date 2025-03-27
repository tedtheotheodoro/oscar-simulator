
let currentLang = 'pt';
let translations = {};

async function setLang(lang) {
  currentLang = lang;
  const res = await fetch(`./locales/${lang}.json`);
  translations = await res.json();
  renderApp();
}

function t(key) {
  const keys = key.split('.');
  return keys.reduce((acc, k) => acc[k], translations);
}

function renderApp() {
  document.getElementById("title").textContent = t("title");
  document.getElementById("subtitle").textContent = t("subtitle");
  document.getElementById("saveBtn").textContent = t("save");
  document.getElementById("restartBtn").textContent = t("restart");

  document.getElementById("app").innerHTML = `
    <h3>${t("step1")}</h3>
    <div class="choices">
      <div onclick="select('actor')">${t("profile.actor")}</div>
      <div onclick="select('director')">${t("profile.director")}</div>
      <div onclick="select('writer')">${t("profile.writer")}</div>
    </div>
  `;
}

let selectedProfile = "";

function select(profile) {
  selectedProfile = profile;
  document.getElementById("app").innerHTML = `
    <h3>${t("step2")}</h3>
    <div class="choices">
      <div onclick="next('marvel')">${t("path.marvel")}</div>
      <div onclick="next('studio')">${t("path.studio")}</div>
      <div onclick="next('indie')">${t("path.indie")}</div>
      <div onclick="next('vanish')">${t("path.vanish")}</div>
    </div>
  `;
}

let decision = "";

function next(path) {
  decision = path;
  document.getElementById("app").innerHTML = `
    <h3>${t("step3")}</h3>
    <div class="choices">
      <div onclick="result('controversial')">${t("media.controversial")}</div>
      <div onclick="result('silent')">${t("media.silent")}</div>
      <div onclick="result('pr')">${t("media.pr")}</div>
      <div onclick="result('political')">${t("media.political")}</div>
    </div>
  `;
}

function result(mediaChoice) {
  let prestige = 0, profit = 0, relevance = 0;

  if (decision === "marvel") { profit += 2; prestige -= 1; }
  if (decision === "studio") { profit += 1; prestige += 1; }
  if (decision === "indie")  { prestige += 2; profit -= 1; }
  if (decision === "vanish") { relevance += 2; profit -= 1; }

  if (mediaChoice === "controversial") { relevance += 2; prestige -= 1; }
  if (mediaChoice === "silent")        { prestige += 1; relevance -= 1; }
  if (mediaChoice === "pr")            { profit += 1; }
  if (mediaChoice === "political")     { relevance += 1; profit -= 1; }

  let final;
  if (prestige >= 2) final = t("results.visionary");
  else if (profit >= 2) final = t("results.commercial");
  else if (relevance >= 2) final = t("results.meme");
  else final = t("results.fade");

  document.getElementById("app").innerHTML = `
    <h3>${t("step4")}</h3>
    <p>${final}</p>
  `;
}
