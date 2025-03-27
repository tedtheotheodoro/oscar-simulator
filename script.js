
function startGame() {
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('app-container').classList.remove('hidden');
  renderStep(0);
}

function setLang(lang) {
  localStorage.setItem("lang", lang);
  updateLanguageElements();
  if (document.getElementById("start-screen").classList.contains("hidden")) {
    renderStep(currentStep);
  } else {
    document.querySelector("#start-screen p + p em").innerText =
      lang === "en"
        ? "You just won an Oscar. What happens next?"
        : "Você acabou de ganhar um Oscar. E agora?";
  }
}

function updateLanguageElements() {
  const lang = localStorage.getItem("lang") || "pt";
  document.getElementById("saveBtn").innerText = lang === "en" ? "Save simulation" : "Salvar simulação";
  document.getElementById("restartBtn").innerText = lang === "en" ? "Restart" : "Reiniciar";
}

function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.contains('dark');
  body.classList.toggle('dark', !isDark);
  body.classList.toggle('light', isDark);
  localStorage.setItem("theme", isDark ? 'light' : 'dark');
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.classList.remove("light", "dark");
  document.body.classList.add(savedTheme);
}

function saveSimulation() {
  if (!firebase.firestore) return alert("Firebase não conectado");

  const data = {
    role: window.selectedRole || "undefined",
    reputation: document.getElementById("result").innerText || "n/a",
    timestamp: new Date().toISOString(),
  };

  firebase.firestore().collection("simulations").add(data)
    .then(() => alert("✅ Simulação salva com sucesso!"))
    .catch(err => alert("Erro ao salvar: " + err.message));
}

const steps = [
  {
    question: { pt: "Qual seu perfil?", en: "Choose your profile" },
    choices: [
      { pt: "Ator", en: "Actor" },
      { pt: "Diretor", en: "Director" },
      { pt: "Roteirista", en: "Screenwriter" }
    ]
  },
  {
    question: { pt: "Qual seu próximo projeto?", en: "What's your next move?" },
    choices: [
      { pt: "Filme autoral", en: "Indie film" },
      { pt: "Blockbuster", en: "Blockbuster" },
      { pt: "Série streaming", en: "Streaming series" }
    ]
  },
  {
    question: { pt: "Você aceitaria fazer publicidade?", en: "Would you do ads?" },
    choices: [
      { pt: "Sim", en: "Yes" },
      { pt: "Depende", en: "Depends" },
      { pt: "Jamais", en: "Never" }
    ]
  }
];

let currentStep = 0;
let answers = [];

function renderStep(index) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const lang = localStorage.getItem("lang") || "pt";

  if (index >= steps.length) return renderResult();

  const step = steps[index];
  const h2 = document.getElementById("subtitle");
  h2.innerText = step.question[lang];

  const container = document.createElement("div");
  container.className = "choices";

  step.choices.forEach(choice => {
    const div = document.createElement("div");
    div.innerText = `${choice[lang]} / ${choice[lang === "pt" ? "en" : "pt"]}`;
    div.onclick = () => {
      if (index === 0) window.selectedRole = div.innerText;
      answers.push(div.innerText);
      currentStep++;
      renderStep(currentStep);
    };
    container.appendChild(div);
  });

  app.appendChild(container);
}

function renderResult() {
  const app = document.getElementById("app");
  const lang = localStorage.getItem("lang") || "pt";
  const output = document.createElement("div");

  const reputation = evaluate(answers);

  output.innerHTML = `
    <h2 id="result">${lang === 'pt' ? "Resultado:" : "Result:"} ${reputation}</h2>
  `;

  app.innerHTML = "";
  app.appendChild(output);
}

function evaluate(ans) {
  const score = ans.reduce((acc, val) => acc + val.length, 0);
  if (score > 50) return "🌟 Você virou um Meme Global!";
  if (score > 30) return "🎯 Respeito da crítica!";
  return "💼 Oportunidades medianas.";
}

function restart() {
  currentStep = 0;
  answers = [];
  window.selectedRole = "";
  renderStep(0);
}

window.onload = updateLanguageElements;
