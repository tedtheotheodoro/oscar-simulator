
// firebase.js
const questions = [
  {
    id: 1,
    title: {
      pt: "Você acabou de ganhar um Oscar! E agora?",
      en: "You just won an Oscar! What's next?"
    },
    choices: [
      { pt: "Ator", en: "Actor" },
      { pt: "Diretor", en: "Director" },
      { pt: "Roteirista", en: "Screenwriter" }
    ]
  },
  {
    id: 2,
    title: {
      pt: "Qual será seu próximo projeto?",
      en: "What's your next move?"
    },
    choices: [
      { pt: "Filme autoral", en: "Indie film" },
      { pt: "Blockbuster", en: "Blockbuster" },
      { pt: "Série de streaming", en: "Streaming series" }
    ]
  },
  {
    id: 3,
    title: {
      pt: "Você aceitaria fazer publicidade?",
      en: "Would you do ads?"
    },
    choices: [
      { pt: "Sim, claro!", en: "Yes, of course!" },
      { pt: "Só se for por uma boa causa", en: "Only for a good cause" },
      { pt: "De jeito nenhum", en: "No way" }
    ]
  },
  {
    id: 4,
    title: {
      pt: "Com quem você sonha em trabalhar agora?",
      en: "Who do you dream of working with now?"
    },
    choices: [
      { pt: "Diretor cult europeu", en: "Cult European director" },
      { pt: "Um grande estúdio", en: "A major studio" },
      { pt: "Coletivos independentes", en: "Indie collectives" }
    ]
  },
  {
    id: 5,
    title: {
      pt: "Como você lida com a fama?",
      en: "How do you handle fame?"
    },
    choices: [
      { pt: "Desapareço da mídia", en: "I vanish from the media" },
      { pt: "Dou entrevistas impactantes", en: "I give strong interviews" },
      { pt: "Entro nas redes e viralizo", en: "I go viral on social media" }
    ]
  }
];

export default questions;
