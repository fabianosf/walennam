import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyBeO1Zoyk8iQD_QnufcRpKYGjbCEFor9bU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "walennam-63019.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "walennam-63019",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "walennam-63019.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "564068969117",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:564068969117:web:c2ec3378bd99bb2c220274",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "G-XMK3MJJSCQ",
};

const app = initializeApp(firebaseConfig);

// Inicializa o Analytics apenas em ambientes suportados (navegador)
if (typeof window !== "undefined") {
  isAnalyticsSupported()
    .then((supported) => {
      if (supported) {
        getAnalytics(app);
      }
    })
    .catch((error) => {
      console.warn("Firebase Analytics não pôde ser inicializado:", error);
    });
}

const db = getFirestore(app);

export { app, db };

