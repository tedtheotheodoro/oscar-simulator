// script.js com layout corrigido e finais personalizados

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
    <div class="top-bar">
      <div class="lang-switch">
        <button onclick="setLanguage('pt')">PT</button>
        <button onclick="setLanguage('en')">EN</button>
      </div>
      <div class="theme-switch">
        <button onclick="toggleTheme()">🌕</button>
      </div>
    </div>
    <div class="content">
      <h2>${question.title[lang]}</h2>
      <div class="options">
        ${question.options.map(option => `
          <button class="main-button" onclick="handleAnswer('${option.pt}')">${option[lang]}</button>
        `).join('')}
      </div>
      <div class="footer-buttons">
        <button class="secondary-button" onclick="startSimulation()">
          ${lang === 'pt' ? 'Reiniciar' : 'Restart'}
        </button>
      </div>
    </div>
  `;
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
  const key = userAnswers.join("|");
  const outcome = endings[key];

  const resultText = outcome
    ? outcome[lang]
    : lang === "pt"
      ? "Você trilhou um caminho tão peculiar que o algoritmo surtou. Parabéns."
      : "Your path was so unexpected the simulator glitched. Congrats.";

  app.innerHTML = `
    <div class="top-bar">
      <div class="lang-switch">
        <button onclick="setLanguage('pt')">PT</button>
        <button onclick="setLanguage('en')">EN</button>
      </div>
      <div class="theme-switch">
        <button onclick="toggleTheme()">🌕</button>
      </div>
    </div>
    <div class="content">
      <h2>${lang === "pt" ? "Resultado da simulação:" : "Simulation result:"}</h2>
      <p>${resultText}</p>
      <div class="footer-buttons">
        <button class="secondary-button" onclick="startSimulation()">
          ${lang === 'pt' ? 'Reiniciar' : 'Restart'}
        </button>
      </div>
    </div>
  `;
}

function renderIntro() {
  app.innerHTML = `
    <div class="top-bar">
      <div class="lang-switch">
        <button onclick="setLanguage('pt')">PT</button>
        <button onclick="setLanguage('en')">EN</button>
      </div>
      <div class="theme-switch">
        <button onclick="toggleTheme()">🌕</button>
      </div>
    </div>
    <div class="content">
      <h1>🏆 Oscar Simulator</h1>
      <p>${lang === "pt" ? "Você acabou de ganhar um Oscar. E agora?" : "You just won an Oscar. What happens next?"}</p>
      <em>${lang === "pt" ? "Simule sua jornada pós-estatueta." : "Simulate your post-statuette journey."}</em>
      <button class="main-button" onclick="startSimulation()">
        ${lang === "pt" ? "Começar" : "Start"}
      </button>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", renderIntro);
