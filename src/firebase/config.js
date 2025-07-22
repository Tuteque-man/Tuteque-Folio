import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuración de Firebase (reemplaza con tus credenciales reales)
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tuteque-man-portfolio.firebaseapp.com",
  projectId: "tuteque-man-portfolio",
  storageBucket: "tuteque-man-portfolio.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener servicios
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app; 