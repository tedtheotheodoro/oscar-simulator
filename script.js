
const app = document.getElementById("app");
let currentQuestion = 0;
let userAnswers = [];
let lang = localStorage.getItem("lang") || "pt";

function setLanguage(language) {
  lang = language;
  localStorage.setItem("lang", language);
  showQuestion();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
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
  toggle.onclick = toggleTheme;
  app.appendChild(toggle);
}

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-button");
  const introText = document.getElementById("intro-text");
  const subtext = document.getElementById("subtext");

  if (startBtn && introText && subtext) {
    introText.innerText = lang === "pt"
      ? "Você acabou de ganhar um Oscar. E agora?"
      : "You just won an Oscar. What happens next?";

    subtext.innerText = lang === "pt"
      ? "Simule sua jornada pós-estatueta."
      : "Simulate your post-statuette journey.";

    startBtn.innerText = lang === "pt" ? "Começar" : "Start";
    startBtn.addEventListener("click", startSimulation);
  }

  createLangAndThemeButtons();
});
