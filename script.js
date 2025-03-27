// script.js com mais finais baseados em 5 variáveis (sarcasmo incluso)

let userProfile = null;
let userProject = null;
let userAds = null;
let userBuzz = null;
let userPath = null;

function avaliarDesfecho(lang = 'pt') {
  const p = userProfile;
  const pr = userProject;
  const a = userAds;
  const b = userBuzz;
  const f = userPath;

  if (p === "Roteirista" && pr === "Filme autoral" && a === "Recusa" && b === "Aclamado pela crítica" && f === "Novo projeto autoral") {
    return lang === 'pt'
      ? "Você virou referência em faculdade de cinema alternativo. Seu filme é projetado em mostras com 5 pessoas e uma cabra."
      : "You became a reference in alternative film schools. Your movie screens at festivals for 5 people and a goat.";
  }
  if (p === "Ator" && pr === "Série streaming" && a === "Aceita" && b === "Sucesso de público" && f === "Contrato com streaming") {
    return lang === 'pt'
      ? "Seu rosto virou figurinha de WhatsApp e estampa canecas irônicas."
      : "Your face is now a WhatsApp sticker and printed on ironic mugs.";
  }
  if (p === "Diretor" && pr === "Filme autoral" && a === "Recusa" && b === "Aclamado pela crítica" && f === "Outra indicação ao Oscar") {
    return lang === 'pt'
      ? "Você recusou 3 convites para a Marvel. Vive de elogios da crítica e pão artesanal."
      : "You turned down 3 offers from Marvel. Living on critical praise and artisan bread.";
  }
  if (p === "Roteirista" && pr === "Série streaming" && a === "Recusa" && b === "Aclamado pela crítica" && f === "Sumir da mídia") {
    return lang === 'pt'
      ? "Ganhou 3 Emmys, nenhum reconhecimento da família. Pelo menos a crítica ama você."
      : "Won 3 Emmys, no recognition from family. At least the critics love you.";
  }
  // Novos finais personalizados com base nas 5 escolhas
  if (p === "Diretor" && pr === "Série streaming" && a === "Recusa" && b === "Aclamado pela crítica" && f === "Novo projeto autoral") {
    return lang === 'pt'
      ? "Você virou lenda no Letterboxd, mas ninguém fora da bolha sabe quem você é."
      : "You're a Letterboxd legend, but no one outside your bubble knows who you are.";
  }
  if (p === "Ator" && pr === "Filme autoral" && a === "Recusa" && b === "Aclamado pela crítica" && f === "Sumir da mídia") {
    return lang === 'pt'
      ? "Você entregou a performance da década... e foi cancelado por um tweet de 2009."
      : "You gave the performance of the decade... and got cancelled for a 2009 tweet.";
  }
  if (p === "Diretor" && pr === "Blockbuster" && a === "Aceita" && b === "Sucesso de público" && f === "Contrato com streaming") {
    return lang === 'pt'
      ? "Parabéns, você virou funcionário do mês da Netflix. Pra sempre."
      : "Congrats, you're Netflix's employee of the month. Forever.";
  }
  if (p === "Ator" && pr === "Blockbuster" && a === "Aceita" && b === "Ambos" && f === "Outra indicação ao Oscar") {
    return lang === 'pt'
      ? "Você não atuou, mas ganhou prêmio. Parabéns por existir."
      : "You didn’t act, but won awards. Congrats for existing.";
  }
  if (p === "Roteirista" && pr === "Blockbuster" && a === "Recusa" && b === "Sucesso de público" && f === "Sumir da mídia") {
    return lang === 'pt'
      ? "O filme foi um sucesso. Ninguém sabe que você escreveu. Nem você lembra."
      : "The movie was a hit. No one knows you wrote it. Not even you remember.";
  }

  return lang === 'pt'
    ? "Você trilhou um caminho tão peculiar que o algoritmo surtou. Parabéns."
    : "Your path was so unexpected the simulator glitched. Congrats.";
}

function displayResult() {
  const lang = localStorage.getItem("lang") || 'pt';
  const resultText = avaliarDesfecho(lang);
  const resultDiv = document.createElement("div");
  resultDiv.className = "result";
  resultDiv.innerText = resultText;
  document.getElementById("app").innerHTML = "";
  document.getElementById("app").appendChild(resultDiv);
}

