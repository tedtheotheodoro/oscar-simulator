// script.js organizado com fluxo lógico e finais sarcásticos multilíngues

const app = document.getElementById("app");
let currentQuestion = 0;
let userAnswers = [];
let lang = localStorage.getItem("lang") || "pt";

// 1. INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", renderIntro);

// 2. INÍCIO DA SIMULAÇÃO
function renderIntro() {
  app.innerHTML = `
    <h1>🏆 Oscar Simulator</h1>
    <p>${lang === "pt" ? "Você acabou de ganhar um Oscar. E agora?" : "You just won an Oscar. What happens next?"}</p>
    <em>${lang === "pt" ? "Simule sua jornada pós-estatueta." : "Simulate your post-statuette journey."}</em>
    <button class="main-button" onclick="startSimulation()">${lang === "pt" ? "Começar" : "Start"}</button>
  `;
  renderTopBar();
}

function startSimulation() {
  currentQuestion = 0;
  userAnswers = [];
  showQuestion();
}

// 3. EXIBIÇÃO DAS PERGUNTAS
function showQuestion() {
  const question = questions[currentQuestion];
  app.innerHTML = `
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
  `;
  renderTopBar();
}

// 4. CAPTURA DAS RESPOSTAS
function handleAnswer(answer) {
  userAnswers.push(answer);
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// 5. RESULTADO
function showResult() {
  const key = userAnswers.join("|");
  const outcome = endings[key];

  const resultText = outcome
    ? outcome[lang]
    : lang === "pt"
      ? "Você tomou decisões tão fora da curva que nem os roteiristas de 'Tudo em Todo Lugar ao Mesmo Tempo' entenderiam. Um caos genial."
      : "Your decisions were so offbeat even the writers of 'Everything Everywhere All at Once' would be confused. Brilliant chaos.";

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

// 6. TOPO E CONFIGURAÇÕES
function renderTopBar() {
  // Remove qualquer instância anterior da barra
  const existingTopBar = document.querySelector(".top-bar");
  if (existingTopBar) {
    existingTopBar.remove();
  }

  // Cria uma nova barra
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
  document.body.prepend(topBar);
}

function setLanguage(language) {
  lang = language;
  localStorage.setItem("lang", language);
  renderIntro();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}
