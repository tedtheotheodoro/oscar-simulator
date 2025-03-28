const app = document.getElementById("app");
let currentQuestion = 0;
let userAnswers = [];
let lang = localStorage.getItem("lang") || "pt";

function setLanguage(language) {
  lang = language;
  localStorage.setItem("lang", language);
  renderIntro();
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
  const question = questions[currentQuestion];
  app.innerHTML = `
    <h2>${question.title[lang]}</h2>
    <div class="options">
      ${question.options.map(option => `
        <button class="main-button" onclick="handleAnswer('${option.key}')">
          ${option[lang]}
        </button>`).join('')}
    </div>
    <div class="footer-buttons">
      <button class="secondary-button" onclick="startSimulation()">
        ${lang === 'pt' ? 'Reiniciar' : 'Restart'}
      </button>
    </div>
  `;
  renderTopBar();
}

function handleAnswer(answerKey) {
  userAnswers.push(answerKey);
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const key = userAnswers.join("|");
  const outcome = endings[key];
  const resultText = outcome
    ? outcome[lang]
    : lang === "pt"
      ? "Você trilhou um caminho tão peculiar que o algoritmo surtou. Parabéns."
      : "Your path was so unexpected the simulator glitched. Congrats.";

  app.innerHTML = `
    <h2>${lang === "pt" ? "Resultado da simulação:" : "Simulation result:"}</h2>
    <p>${resultText}</p>
    <div class="footer-buttons">
      <button class="secondary-button" onclick="startSimulation()">
        ${lang === "pt" ? "Reiniciar" : "Restart"}
      </button>
    </div>
  `;
  renderTopBar();
}

function renderTopBar() {
  const topBar = document.createElement("div");
  topBar.className = "top-bar";
  topBar.innerHTML = `
    <div class="lang-switch">
      <button onclick="setLanguage('pt')">PT</button>
      <button onclick="setLanguage('en')">EN</button>
    </div>
    <div class="theme-switch">
      <button onclick="toggleTheme()">🌕</button>
    </div>
  `;
  const existing = document.querySelector(".top-bar");
  if (existing) existing.remove();
  document.body.prepend(topBar);
}

function renderIntro() {
  app.innerHTML = `
    <h1>🏆 Oscar Simulator</h1>
    <p>${lang === "pt" ? "Você acabou de ganhar um Oscar. E agora?" : "You just won an Oscar. What happens next?"}</p>
    <em>${lang === "pt" ? "Simule sua jornada pós-estatueta." : "Simulate your post-statuette journey."}</em>
    <br><br>
    <button class="main-button" onclick="startSimulation()">
      ${lang === "pt" ? "Começar" : "Start"}
    </button>
  `;
  renderTopBar();
}

document.addEventListener("DOMContentLoaded", renderIntro);
