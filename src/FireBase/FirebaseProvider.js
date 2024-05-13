// Import the functions you need from the SDKs you need
import React, { useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  CollectionReference,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const FirebaseContext = React.createContext({});
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
const startFirebase = initializeApp(firebaseConfig);
//init services
//basic auth
export const auth = getAuth(startFirebase);
//google auth
export const googleProvider = new GoogleAuthProvider();
//db
export const database = getFirestore(startFirebase);
//images
export const storage = getStorage(startFirebase);

export const FirebaseProvider = (props) => {
  const children = props.children;
  const theValues = { database, auth, storage };

  return (
    <FirebaseContext.Provider value={theValues}>
      {children}
    </FirebaseContext.Provider>
  );
};

export function useFirebase() {
  return useContext(FirebaseContext);
}

//FETCHING PET PARENT (CLIENT) DATA
const clientCollection = collection(database, "Pet-Parents");
getDocs(clientCollection)
  .then((snapshot) => {
    let clients = [];
    snapshot.docs.forEach((docs) => {
      clients.push({
        id: docs.id,
        petParent: docs.data(),
      });
    });
    console.log(clients, "PAREEEENNNNTTSSSS");
  })
  .catch((err) => {
    console.log(err.message);
  });

//FETCHING ADMIN DATA
const adminCollection = collection(database, "Admin");
getDocs(adminCollection)
  .then((snapshot) => {
    let admin = [];
    snapshot.docs.forEach((docs) => {
      admin.push({
        id: docs.id,
        admin: docs.data(),
      });
    });
    console.log(admin, "DA BOSSSSSSSSSS");
  })
  .catch((err) => {
    console.log(err.message);
  });

//FETCHING PETS FROM DB
export async function getAllData(database) {
  const petsCollection = collection(database, "Adoptees");
  const petSnapshot = await getDocs(petsCollection);
  const dbpetList = petSnapshot.docs.map((docs) => docs.data());
  console.log(dbpetList, "dbpetList HERE");
  return dbpetList;
}

// //ADDING ADOPTION DOCUMENTS
// const addPetToAdoptionForm = document.querySelector(".add");
// addPetToAdoptionForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   addDoc(petsCollection, {
//     name: addPetToAdoptionForm.name.value,
//     description: addPetToAdoptionForm.description.value,
//   }).then(() => {
//     addPetToAdoptionForm.reset;
//   });
// });

// //DELETING ADOPTION DOCS
// const deleteAdoptionForm = document.querySelector(".delete");
// deleteAdoptionForm.addEventListener("submit", (e) => {
//   e.preventDefault();
// });
