import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { database, useFirebase } from "../FireBase/FirebaseProvider";
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
      //   name: formValues.name,
      //   species: formValues.species,
      //   age: formValues.age,
      //   description: formValues.description,
      //   image: formValues.image,
      //   breed: formValues.breed,
      //   gender: formValues.gender,
      //   color: formValues.color,
      //   availability: formValues.availability,
      //   lifeStage: formValues.lifeStage,
      //   intakeDate: formValues.intakeDate,
    });
    console.log("Create business success!");
  } catch (ex: any) {
    console.log("FIRESTORE ADD FAILURE!", ex.message);
  }
};
