// script.js
const app = document.getElementById("app");
let currentQuestion = 0;
let userAnswers = [];
let lang = localStorage.getItem("lang") || "pt";

// 1. Alternância de idioma
function setLanguage(language) {
  lang = language;
  localStorage.setItem("lang", language);
  renderIntro();
}

// 2. Alternância de tema
function toggleTheme() {
  document.body.classList.toggle("dark");
}

// 3. Tela inicial
function renderIntro() {
  app.innerHTML = `
    <h1>🏆 Oscar Simulator</h1>
    <p>${lang === "pt" ? "Você acabou de ganhar um Oscar. E agora?" : "You just won an Oscar. What happens next?"}</p>
    <em>${lang === "pt" ? "Simule sua jornada pós-estatueta." : "Simulate your post-statuette journey."}</em>
    <button class="main-button" onclick="startSimulation()">${lang === "pt" ? "Começar" : "Start"}</button>
  `;
}

// 4. Início da simulação
function startSimulation() {
  currentQuestion = 0;
  userAnswers = [];
  showQuestion();
}

// 5. Exibir pergunta atual
function showQuestion() {
  const question = questions[currentQuestion];
  app.innerHTML = `
    <h2>${question.title[lang]}</h2>
    <div class="options">
      ${question.options
        .map(
          (option) => `
        <button class="main-button" onclick="handleAnswer('${option.pt}')">
          ${option[lang]}
        </button>`
        )
        .join("")}
    </div>
    <div class="footer-buttons">
      <button class="secondary-button" onclick="startSimulation()">
        ${lang === "pt" ? "Reiniciar" : "Restart"}
      </button>
    </div>
  `;
}

// 6. Registrar resposta
function handleAnswer(answer) {
  userAnswers.push(answer);
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// 7. Mostrar resultado
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
}

// 8. Renderizar tela inicial quando a página carregar
document.addEventListener("DOMContentLoaded", renderIntro);
