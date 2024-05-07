// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-Jx4f3D5zsYC1X_DNBa161jXOUQnqzBk",
  authDomain: "adopt-me-969be.firebaseapp.com",
  projectId: "adopt-me-969be",
  storageBucket: "adopt-me-969be.appspot.com",
  messagingSenderId: "773443566619",
  appId: "1:773443566619:web:acc05ed85f6923826f4cbe",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);
// const todosCol = collection(db, "todos");
// const snapshot = await getDocs(todosCol);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db);
export async function getAllData(db) {
  const petsCollection = collection(db, "Adoptees");
  const petSnapshot = await getDocs(petsCollection);
  const dbpetList = petSnapshot.docs.map((docs) => docs.data());
  console.log(dbpetList);
  return dbpetList;
}
