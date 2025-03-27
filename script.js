// script.js com lógica de finais baseada em IF explícito e 5 variáveis

const app = document.getElementById("app");
let currentQuestion = 0;
let userAnswers = [];
let lang = localStorage.getItem("lang") || "pt";

function setLanguage(language) {
  lang = language;
  localStorage.setItem("lang", language);
  renderStartScreen();
}

function startSimulation() {
  currentQuestion = 0;
  userAnswers = [];
  showQuestion();
}

function showQuestion() {
  app.innerHTML = "";
  const question = questions[currentQuestion];

  const title = document.createElement("h2");
  title.innerText = question.title[lang];
  app.appendChild(title);

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "main-button";
    button.innerText = option[lang];
    button.onclick = () => handleAnswer(option["pt"]);
    app.appendChild(button);
  });

  createLangAndThemeButtons();
}

function handleAnswer(answer) {
  userAnswers.push(answer);
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const [profile, project, publicity, buzz, path] = userAnswers;
  let result = "";

  if (profile === "Roteirista" && project === "Filme autoral" && publicity === "Recusa" && buzz === "Aclamado pela crítica" && path === "Novo projeto autoral") {
    result = lang === "pt"
      ? "Você virou referência em faculdade de cinema alternativo. Seu filme é projetado em mostras com 5 pessoas e uma cabra."
      : "You became a reference in alternative film schools. Your movie screens at festivals for 5 people and a goat.";
  } else if (profile === "Ator" && project === "Série streaming" && publicity === "Aceita" && buzz === "Sucesso de público" && path === "Contrato com streaming") {
    result = lang === "pt"
      ? "Seu rosto virou figurinha de WhatsApp e estampa canecas irônicas."
      : "Your face is now a WhatsApp sticker and printed on ironic mugs.";
  } else if (profile === "Diretor" && project === "Filme autoral" && publicity === "Recusa" && buzz === "Aclamado pela crítica" && path === "Outra indicação ao Oscar") {
    result = lang === "pt"
      ? "Você recusou 3 convites para a Marvel. Vive de elogios da crítica e pão artesanal."
      : "You turned down 3 offers from Marvel. Living on critical praise and artisan bread.";
  } else if (profile === "Roteirista" && project === "Série streaming" && publicity === "Recusa" && buzz === "Aclamado pela crítica" && path === "Sumir da mídia") {
    result = lang === "pt"
      ? "Ganhou 3 Emmys, nenhum reconhecimento da família. Pelo menos a crítica ama você."
      : "Won 3 Emmys, no recognition from family. At least the critics love you.";
  } else {
    result = lang === "pt"
      ? "Você trilhou um caminho tão peculiar que o algoritmo surtou. Parabéns."
      : "Your path was so unexpected the simulator glitched. Congrats.";
  }

  app.innerHTML = `
    <h2>${lang === "pt" ? "Resultado da simulação:" : "Simulation result:"}</h2>
    <p>${result}</p>
    <button class="secondary-button" onclick="startSimulation()">
      ${lang === "pt" ? "Reiniciar" : "Restart"}
    </button>
  `;
  createLangAndThemeButtons();
}

function createLangAndThemeButtons() {
  const ptBtn = document.createElement("button");
  ptBtn.innerText = "PT";
  ptBtn.onclick = () => setLanguage("pt");
  app.appendChild(ptBtn);

  const enBtn = document.createElement("button");
  enBtn.innerText = "EN";
  enBtn.onclick = () => setLanguage("en");
  app.appendChild(enBtn);

  const toggle = document.createElement("button");
  toggle.innerText = "🌖";
  toggle.onclick = () => document.body.classList.toggle("dark");
  app.appendChild(toggle);
}

function renderStartScreen() {
  app.innerHTML = `
    <h1>🏆 Oscar Simulator</h1>
    <p>${lang === "pt"
      ? "Você acabou de ganhar um Oscar. E agora?"
      : "You just won an Oscar. What happens next?"}</p>
    <br><br>
    <button class="main-button" id="start-button">
      ${lang === "pt" ? "Começar" : "Start"}
    </button>
  `;
  document.getElementById("start-button").addEventListener("click", startSimulation);
  createLangAndThemeButtons();
}

document.addEventListener("DOMContentLoaded", renderStartScreen);
