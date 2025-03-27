
function enterApp() {
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('app-container').classList.remove('hidden');
  setLang('pt');
}

function toggleTheme() {
  const body = document.body;
  const current = body.classList.contains('dark') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  body.classList.remove(current);
  body.classList.add(next);
  localStorage.setItem('theme', next);
}

window.onload = () => {
  const saved = localStorage.getItem('theme') || 'light';
  document.body.classList.add(saved);
}
