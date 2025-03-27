
// Firebase config - substitua com suas credenciais
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function saveSimulation() {
  db.collection("simulations").add({
    profile: selectedProfile,
    decision: decision,
    language: currentLang,
    timestamp: new Date()
  }).then(() => {
    alert("Simulação salva com sucesso!");
  }).catch((error) => {
    console.error("Erro ao salvar: ", error);
  });
}
