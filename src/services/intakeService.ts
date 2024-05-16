import { addDoc, collection } from "firebase/firestore";
import { auth, database } from "../FireBase/FirebaseProvider";
import { SurrenderedPet } from "../models/SurrenderedPet";

const apiURL = process.env.REACT_APP_API_URL + "intake" || "";

export const postIntake = async (
  intakeValues: SurrenderedPet
): Promise<any> => {
  console.log(intakeValues);
  try {
    let collectionRef = collection(database, "SurrenderedPets");
    await addDoc(collectionRef, {
      ...intakeValues,
      userId: auth?.currentUser?.uid,
    });
    console.log("Submitted surrendered pet successfully!");
  } catch (ex) {
    console.log("FIRESTORE ADD FAILURE! surrendered pet");
  }
};
