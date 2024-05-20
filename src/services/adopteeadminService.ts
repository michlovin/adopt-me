import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { database, auth } from "../FireBase/FirebaseProvider";
import { AdminForm } from "../models/AdminForm";

const apiURL = process.env.REACT_APP_API_URL + "adminintake" || "";

export const postAdopteeAdminService = async (
  formValues: AdminForm
): Promise<any> => {
  try {
    console.log(formValues);
    let collectionRef = collection(database, "Adoptees");
    await addDoc(collectionRef, {
      ...formValues,
      userId: auth?.currentUser?.uid,
    });
    console.log("Create pet success!");
  } catch (ex: any) {
    console.log("FIRESTORE ADD FAILURE to add new adoptee!", ex.message);
  }
};

export const editAdminPet = async (
  id: string,
  formValues: AdminForm
): Promise<any> => {
  try {
    await setDoc(doc(database, "Adoptees", id), {
      ...formValues,
    });
    console.log("Create pet success!");
  } catch (ex: any) {
    console.log("FIRESTORE ADD FAILURE to add new adoptee!", ex.message);
  }
};
