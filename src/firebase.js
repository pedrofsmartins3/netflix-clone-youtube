import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCeSEveD0ZcYHxp6-5OM3DeM0VQ-SJq268",
  authDomain: "netflix-clone-870d4.firebaseapp.com",
  projectId: "netflix-clone-870d4",
  storageBucket: "netflix-clone-870d4.appspot.com",
  messagingSenderId: "374477132302",
  appId: "1:374477132302:web:eed7092abc34bc5802e25f"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();

export { auth, db }

{/* Aqui tem a minha key para ter acesso ao firebase e exporto o auth para usar nas páginas login e signup */}