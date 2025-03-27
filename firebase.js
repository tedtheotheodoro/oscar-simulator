
// Firebase config - substitua com suas credenciais
const firebaseConfig = {
    apiKey: "AIzaSyBd_EsQp_CLn5DCUUa9a8FhSFFXcHZIayI",
    authDomain: "oscar-simulator.firebaseapp.com",
    projectId: "oscar-simulator",
    storageBucket: "oscar-simulator.firebasestorage.app",
    messagingSenderId: "966184712255",
    appId: "1:966184712255:web:d1bec12a4cbd96df13e08a"
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
