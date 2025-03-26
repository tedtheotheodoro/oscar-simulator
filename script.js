
let role = '';
let score = {
  prestigio: 0,
  lucro: 0,
  relevancia: 0
};

function selectRole(selected) {
  role = selected;
  document.getElementById('step1').classList.add('hidden');
  document.getElementById('step2').classList.remove('hidden');
  document.getElementById('stepNumber').innerText = '2';
  document.getElementById('roleResult').innerText = `Perfil escolhido / Selected profile: ${role}`;
}

function selectPath(choice) {
  document.getElementById('step2').classList.add('hidden');
  document.getElementById('step3').classList.remove('hidden');
  document.getElementById('stepNumber').innerText = '3';

  switch (choice) {
    case 'Marvel':
      score.lucro += 2;
      score.prestigio -= 1;
      break;
    case 'Produtora':
      score.lucro += 1;
      score.prestigio += 1;
      break;
    case 'Indie':
      score.prestigio += 2;
      score.lucro -= 1;
      break;
    case 'Sumir':
      score.relevancia += 2;
      score.lucro -= 1;
      break;
  }
}

function mediaChoice(option) {
  document.getElementById('step3').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');
  document.getElementById('stepNumber').innerText = '4';

  switch (option) {
    case 'Polemico':
      score.relevancia += 2;
      score.prestigio -= 1;
      break;
    case 'Recluso':
      score.prestigio += 1;
      score.relevancia -= 1;
      break;
    case 'PR':
      score.lucro += 1;
      break;
    case 'Politico':
      score.relevancia += 1;
      score.lucro -= 1;
      break;
  }

  let resultado = '';
  if (score.prestigio >= 2) {
    resultado = '🎬 Você é o Visionário Cultuado.\nYou are the Cult Visionary.';
  } else if (score.lucro >= 2) {
    resultado = '💰 Você é o Astro Comercial.\nYou are the Commercial Star.';
  } else if (score.relevancia >= 2) {
    resultado = '🔥 Você virou um Meme Global.\nYou became a Global Meme.';
  } else {
    resultado = '🕯️ Você se apagou aos poucos…\nYou quietly faded away…';
  }

  document.getElementById('finalResult').innerText = resultado;
  document.getElementById('restartBtn').classList.remove('hidden');
}

function restart() {
  location.reload();
}
