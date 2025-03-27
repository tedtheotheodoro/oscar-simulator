
const app = document.getElementById("app");
let currentQuestion = 0;
let userAnswers = [];
let lang = localStorage.getItem("lang") || "pt";

function setLanguage(language) {
  lang = language;
  localStorage.setItem("lang", language);
  if (currentQuestion === 0) renderIntro();
  else showQuestion();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

function createLangAndThemeButtons() {
  const wrapper = document.createElement("div");
  wrapper.className = "top-bar";

  const ptBtn = document.createElement("button");
  ptBtn.innerText = "PT";
  ptBtn.className = "main-button";
  ptBtn.onclick = () => setLanguage("pt");

  const enBtn = document.createElement("button");
  enBtn.innerText = "EN";
  enBtn.className = "main-button";
  enBtn.onclick = () => setLanguage("en");

  const toggle = document.createElement("button");
  toggle.innerText = "🌖";
  toggle.className = "main-button";
  toggle.onclick = toggleTheme;

  wrapper.appendChild(ptBtn);
  wrapper.appendChild(enBtn);
  wrapper.appendChild(toggle);
  app.appendChild(wrapper);
}

function renderIntro() {
  app.innerHTML = `
    <h1>🏆 Oscar Simulator</h1>
    <p id="intro-text">${lang === "pt" ? "Você acabou de ganhar um Oscar. E agora?" : "You just won an Oscar. What happens next?"}</p>
    <em id="subtext">${lang === "pt" ? "Simule sua jornada pós-estatueta." : "Simulate your post-statuette journey."}</em><br><br>
    <button class="main-button" id="start-button">${lang === "pt" ? "Começar" : "Start"}</button>
  `;

  const startBtn = document.getElementById("start-button");
  if (startBtn) {
    startBtn.addEventListener("click", startSimulation);
  }

  createLangAndThemeButtons();
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
  const result = lang === "pt"
    ? "Você chegou ao fim da simulação. Finais personalizados ainda serão implementados!"
    : "You reached the end of the simulation. Custom endings coming soon!";

  app.innerHTML = `
    <h2>${lang === "pt" ? "Resultado da simulação:" : "Simulation result:"}</h2>
    <p>${result}</p>
    <button class="secondary-button" onclick="startSimulation()">
      ${lang === "pt" ? "Reiniciar" : "Restart"}
    </button>
  `;
  createLangAndThemeButtons();
}

window.onload = renderIntro;
