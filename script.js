
function startGame() {
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('app-container').classList.remove('hidden');
  renderStep(0);
}

function setLang(lang) {
  localStorage.setItem("lang", lang);
  location.reload();
}

function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.contains('dark');
  body.classList.toggle('dark', !isDark);
  body.classList.toggle('light', isDark);
  localStorage.setItem("theme", isDark ? 'light' : 'dark');
}

// Firebase save
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

// Placeholder simulation logic
const steps = [
  {
    question: {
      pt: "Qual seu perfil?",
      en: "Choose your profile"
    },
    choices: ["Ator / Actor", "Diretor / Director", "Roteirista / Screenwriter"]
  },
  {
    question: {
      pt: "Qual seu próximo projeto?",
      en: "What's your next move?"
    },
    choices: ["Filme autoral", "Blockbuster", "Série streaming"]
  },
  {
    question: {
      pt: "Você aceitaria fazer publicidade?",
      en: "Would you do ads?"
    },
    choices: ["Sim", "Depende", "Jamais"]
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
    div.innerText = choice;
    div.onclick = () => {
      if (index === 0) window.selectedRole = choice;
      answers.push(choice);
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
