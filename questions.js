// script.js

let currentQuestion = 0;
let answers = [];
let language = localStorage.getItem("lang") || "pt";
let isDarkMode = localStorage.getItem("darkMode") === "true";

document.addEventListener("DOMContentLoaded", () => {
  renderQuestion();
  updateLangUI();
  applyTheme();
});

// === HANDLERS ===

function setLanguage(lang) {
  language = lang;
  localStorage.setItem("lang", lang);
  updateLangUI();
  renderQuestion();
}

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  localStorage.setItem("darkMode", isDarkMode);
  applyTheme();
}

function restartSimulation() {
  currentQuestion = 0;
  answers = [];
  renderQuestion();
}

function saveSimulation() {
  const key = `oscar-sim-${new Date().toISOString()}`;
  localStorage.setItem(key, JSON.stringify(answers));
  alert(language === "pt" ? "Simulação salva!" : "Simulation saved!");
}

function startSimulation() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  renderQuestion();
}

// === RENDERING ===

function renderQuestion() {
  const container = document.getElementById("quiz");
  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  const q = questions[currentQuestion];
  const title = q.title[language];
  const options = q.options;

  container.innerHTML = `
    <h2>${title}</h2>
    <div class="options">
      ${options
        .map(
          (opt) =>
            `<button onclick="selectOption('${opt.pt}')">${opt[language]}</button>`
        )
        .join("")}
    </div>
    <div class="actions">
      <button onclick="saveSimulation()">${language === "pt" ? "Salvar simulação" : "Save simulation"}</button>
      <button onclick="restartSimulation()">${language === "pt" ? "Reiniciar" : "Restart"}</button>
    </div>
  `;
}

function selectOption(choice) {
  answers.push(choice);
  currentQuestion++;
  renderQuestion();
}

function showResult() {
  const key = answers.join("|");

  const result =
    endings[key]?.[language] ||
    (language === "pt"
      ? "Você é uma figura enigmática de Hollywood. Ninguém sabe o que esperar de você."
      : "You're an enigmatic Hollywood figure. Nobody knows what to expect from you.");

  document.getElementById("quiz").innerHTML = `
    <div class="result">
      <h2>${language === "pt" ? "Resultado:" : "Result:"}</h2>
      <p>${result}</p>
      <div class="actions">
        <button onclick="saveSimulation()">${language === "pt" ? "Salvar simulação" : "Save simulation"}</button>
        <button onclick="restartSimulation()">${language === "pt" ? "Reiniciar" : "Restart"}</button>
      </div>
    </div>
  `;
}

function updateLangUI() {
  document.getElementById("btn-pt").classList.toggle("active", language === "pt");
  document.getElementById("btn-en").classList.toggle("active", language === "en");
}

function applyTheme() {
  document.body.classList.toggle("dark", isDarkMode);
}

// === ENDINGS ===

const endings = {
  "Roteirista|Filme autoral|Recusa|Aclamado pela crítica|Novo projeto autoral": {
    pt: "Você virou referência em faculdade de cinema alternativo. Seu filme é projetado em mostras com 5 pessoas e uma cabra.",
    en: "You became a reference in alternative film schools. Your movie screens at festivals for 5 people and a goat."
  },
  "Ator|Série streaming|Aceita|Sucesso de público|Contrato com streaming": {
    pt: "Seu rosto virou figurinha de WhatsApp e estampa canecas irônicas.",
    en: "Your face is now a WhatsApp sticker and printed on ironic mugs."
  },
  "Diretor|Filme autoral|Recusa|Aclamado pela crítica|Sumir da mídia": {
    pt: "Você recusou 3 convites para a Marvel. Vive de elogios da crítica e pão artesanal.",
    en: "You turned down 3 offers from Marvel. Living on critical praise and artisan bread."
  },
  "Roteirista|Série streaming|Recusa|Aclamado pela crítica|Outra indicação ao Oscar": {
    pt: "Ganhou 3 Emmys, nenhum reconhecimento da família. Pelo menos a crítica ama você.",
    en: "Won 3 Emmys, no recognition from family. At least the critics love you."
  },
  "Ator|Blockbuster|Aceita|Sucesso de público|Contrato com streaming": {
    pt: "Seu nome está num energético. Você é grande. Literalmente, está em outdoors.",
    en: "Your name is on an energy drink. You’re everywhere. Literally."
  },
  "Diretor|Filme autoral|Aceita|Aclamado pela crítica|Novo projeto autoral": {
    pt: "Faz cinema experimental e campanhas de perfume que ninguém entende. E finge que isso é arte.",
    en: "You make experimental films and perfume ads no one understands. And call it art."
  },
  "Roteirista|Blockbuster|Recusa|Aclamado pela crítica|Sumir da mídia": {
    pt: "Todo mundo ama seu filme. Ninguém sabe que você escreveu. Parabéns pela anonimidade.",
    en: "Everyone loves the movie. No one knows you wrote it. Congrats on the invisibility."
  },
  "Diretor|Blockbuster|Recusa|Aclamado pela crítica|Outra indicação ao Oscar": {
    pt: "Recusou marketing, recusou entrevistas. Dirige só pela arte. Ou algo assim.",
    en: "Rejected marketing, interviews, the works. Directs only for “the art.”"
  },
  // ...adicione mais combinações conforme desejar
};
