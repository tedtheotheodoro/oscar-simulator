let currentQuestion = 0;
let answers = [];
let language = 'pt';

function startGame() {
  document.querySelector('.start-screen').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('questionTitle').textContent = q.title[language];
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt[language];
    btn.onclick = () => {
      answers.push(opt[language]);
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        document.getElementById('questionTitle').textContent = language === 'pt' ? 'Simulação completa!' : 'Simulation complete!';
        optionsDiv.innerHTML = '';
      }
    };
    optionsDiv.appendChild(btn);
  });
}

function switchLanguage(lang) {
  language = lang;
  document.documentElement.lang = lang;
  document.getElementById('subtitle').textContent = lang === 'pt' ? 'Você acabou de ganhar um Oscar. E agora?' : 'You just won an Oscar. What happens next?';
  document.getElementById('subtitle-en').style.display = lang === 'pt' ? 'block' : 'none';
  document.getElementById('startBtn').textContent = lang === 'pt' ? 'Começar' : 'Start';
  document.getElementById('saveBtn').textContent = lang === 'pt' ? 'Salvar simulação' : 'Save simulation';
  document.getElementById('restartBtn').textContent = lang === 'pt' ? 'Reiniciar' : 'Restart';
  showQuestion();
}

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark');
  body.classList.toggle('light');
}

function restartGame() {
  currentQuestion = 0;
  answers = [];
  document.querySelector('.start-screen').classList.remove('hidden');
  document.getElementById('game').classList.add('hidden');
}

function saveSimulation() {
  console.log('Respostas salvas:', answers);
}