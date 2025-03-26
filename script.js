
let role = '';

function selectRole(selected) {
  role = selected;
  document.getElementById('step1').classList.add('hidden');
  document.getElementById('step2').classList.remove('hidden');
  document.getElementById('stepNumber').innerText = '2';
  document.getElementById('roleResult').innerText = `Perfil escolhido / Selected profile: ${role}`;
}

function selectPath(choice) {
  document.getElementById('step2').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');
  document.getElementById('stepNumber').innerText = '3';

  let outcome = '';
  switch (choice) {
    case 'Assinar com a Marvel por 5 filmes':
      outcome = 'Você entra no circuito blockbuster, ganha milhões, mas críticos torcem o nariz.\nYou join the blockbuster circuit, earn millions, but critics lose interest.';
      break;
    case 'Criar produtora com first-look deal':
      outcome = 'Você ganha autonomia criativa, mas enfrenta pressão para entregar sucessos.\nYou gain creative control, but must deliver commercial hits.';
      break;
    case 'Fazer um filme autoral e intimista':
      outcome = 'A crítica te reverencia, mas o público é limitado.\nCritics adore you, but the audience is niche.';
      break;
    case 'Sumir por 2 anos para criar mistério':
      outcome = 'Sua ausência gera culto, mas o mercado esquece rápido.\nYour absence builds mystique, but Hollywood moves on quickly.';
      break;
  }

  document.getElementById('pathResult').innerText = outcome;
}
