
function startGame() {
  document.getElementById('game').classList.remove('hidden');
}

function selectRole(role) {
  document.getElementById('output').innerHTML = 
    '<p>Você escolheu: <strong>' + role + '</strong></p>' +
    '<p>You chose: <strong>' + role + '</strong></p>';
}
