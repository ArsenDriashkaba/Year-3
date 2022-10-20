import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCbpO3_D0fmhFZl3sZI6syD5_tg8rIs2nA",
  authDomain: "webove-programovanie.firebaseapp.com",
  projectId: "webove-programovanie",
  storageBucket: "webove-programovanie.appspot.com",
  messagingSenderId: "642609672544",
  appId: "1:642609672544:web:f075f02ec0a7395cabee05",
  measurementId: "G-3BNLBBJ5M0",
};

initializeApp(firebaseConfig);

const db = getDatabase();

export const setUserScore = async (name, score) => {
  const reference = ref(db, `scores/${name}`);

  await set(reference, { score });
};

export const getScoreTable = async () => {
  const reference1 = ref(db, "scores");

  const snapshot = await get(reference1);
  const data = snapshot.toJSON();

  return data;
};
