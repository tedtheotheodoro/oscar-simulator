const questions = [
  {
    key: "profile",
    title: {
      pt: "Escolha seu perfil",
      en: "Choose your profile"
    },
    options: [
      { key: "actor", pt: "Ator", en: "Actor" },
      { key: "director", pt: "Diretor", en: "Director" },
      { key: "screenwriter", pt: "Roteirista", en: "Screenwriter" }
    ]
  },
  {
    key: "project",
    title: {
      pt: "Qual o seu próximo projeto?",
      en: "What's your next move?"
    },
    options: [
      { key: "indie_film", pt: "Filme autoral", en: "Indie film" },
      { key: "blockbuster", pt: "Blockbuster", en: "Blockbuster" },
      { key: "streaming_series", pt: "Série streaming", en: "Streaming series" }
    ]
  },
  {
    key: "ads",
    title: {
      pt: "Você aceitaria fazer publicidade?",
      en: "Would you do ads?"
    },
    options: [
      { key: "accept_ads", pt: "Aceita", en: "Yes" },
      { key: "decline_ads", pt: "Recusa", en: "No" }
    ]
  },
  {
    key: "reception",
    title: {
      pt: "Sua repercussão foi...",
      en: "Your reception was..."
    },
    options: [
      { key: "critically_acclaimed", pt: "Aclamado pela crítica", en: "Critically acclaimed" },
      { key: "box_office_hit", pt: "Sucesso de público", en: "Box office hit" },
      { key: "both", pt: "Ambos", en: "Both" }
    ]
  },
  {
    key: "career",
    title: {
      pt: "Próximo passo na carreira?",
      en: "Next career move?"
    },
    options: [
      { key: "blockbuster", pt: "Blockbuster", en: "Blockbuster" },
      { key: "cult", pt: "Culto", en: "Cult" },
      { key: "streaming", pt: "Contrato com streaming", en: "Streaming contract" }
    ]
  }
];

export default questions;

