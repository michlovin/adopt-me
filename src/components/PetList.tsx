import { useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Pet } from "../models/Pet";

import { PetCard } from "./PetCard";
import "./css/petlist.css";
import { HorizontialCard } from "./HorizontalCard";
import { TextCard } from "./TextCard";
import { FullWidthImageBanner } from "./FullWidthImageBanner";
import handleSubmit from "../FireBase/firebasehandlesubmit";
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { database } from "../FireBase/FirebaseProvider";
import { Auth } from "./auth";

export async function getPetById(
  database: Firestore,
  id: string
): Promise<Pet | null> {
  const petDocRef = doc(database, "Adoptees", id);

  try {
    const petDocSnap = await getDoc(petDocRef);
    if (petDocSnap.exists()) {
      const petData = petDocSnap.data();
      console.log(petData, petDocRef, "what is this?");
      // Assuming Pet is the type of your pet data model
      return petData as Pet;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting pet document:", error);
    return null;
  }
}

export function PetList() {
  const dataRef = useRef<HTMLInputElement>(null);
  const [pets, setPets] = useState<Pet[]>([]); //yay this is not wrong
  const petsCollectionRef = collection(database, "Adoptees");
  console.log(pets, "is this pets");
  const [filteredPets, setFilteredPets] = useState([]);

  //New Pet States...do not need this
  // const [newPetName, setNewPetName] = useState("");
  // const [newPetBreed, setNewPetBreed] = useState("");
  // const [newPetDescription, setNewPetDescription] = useState("");

  useEffect(() => {
    const getPetList = async () => {
      try {
        const data = await getDocs(petsCollectionRef);
        const filteredPetData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filteredPetData, "THEEEEE COLLECTION REF");
      } catch (err: any) {
        console.error(err);
      }
    };
    getPetList();
  }, []);

  // useEffect(() => {
  //   const getPetList = async () => {
  //     try {
  //       const petsCollectionRef = collection(database, "pets");
  //       const querySnapshot = await getDocs(petsCollectionRef);
  //       querySnapshot.forEach((doc) => {
  //         console.log(doc.id, " => ", doc.data());
  //       });
  //     } catch (error) {
  //       console.error("Error fetching pet list:", error);
  //     }
  //   };

  //   getPetList();
  // }, []);

  //parent of pet card
  //taking data from parent to child is props
  //UseEffect what do you want to do and when do you want to run it
  //go call the api and then grab all the pets from the api and take the state and update the state when the component first renders

  const submithandler = (e: any) => {
    e.preventDefault();
    if (dataRef.current?.value) {
      handleSubmit(dataRef?.current?.value);
      dataRef.current.value = "";
    }
  };

  //fix this use effect do we really need unsubscribe here not sure it is being used
  //typecasting was used to force the type here because when data is fetch from the db you do not know what is coming so forcing type will fix this
  useEffect(() => {
    let queryRef = query(petsCollectionRef, orderBy("name"));
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log("No docs found");
      } else {
        let petsData: Pet[] = querySnap.docs.map((doc) => {
          return { ...doc.data() } as Pet;
        });
        console.log(petsData, "PET DATA");
        setPets(petsData);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const syntheticEvent = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onInputChange(syntheticEvent);
  }, [pets]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newpetList: any = pets.filter((pet: any) => {
      return (
        pet.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        pet.breed.toLowerCase().includes(e.target.value.toLowerCase()) ||
        pet.description.toLowerCase().includes(e.target.value.toLowerCase()) ||
        pet.gender.toLowerCase().includes(e.target.value.toLowerCase()) ||
        pet.species.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setFilteredPets(newpetList);
  };

  // const deleteAdminPetFromDB = async (id: string) => {
  //   console.log(database, "TESTING FB");
  //   try {
  //     await deleteDoc(doc(database, "Adoptees", id));
  //     console.log("Pet deleted successfully from admin intake/pet list!");
  //   } catch (error) {
  //     console.error("Error deleting pet:");
  //   }
  // };

  const deleteAdminPetFromDB = async () => {
    const petDeleteDoc = doc(database, "Adoptees");
    await deleteDoc();
  };

  return (
    <>
      <div className="petlist">
        <Auth />
        <input type="text" placeholder="Search..." onChange={onInputChange} />
        <HorizontialCard />
        <div className="grid-spacing">
          <Row>
            {filteredPets.map((pet) => (
              <Col lg={4}>
                <PetCard pet={pet} />
                <br />
                <button onClick={() => deleteAdminPetFromDB(pet.id)}>
                  Delete Pet
                </button>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <FullWidthImageBanner />
      <TextCard />
    </>
  );
}
function setPets(_PetsData: { DOC_ID: string }[]) {
  throw new Error("Function not implemented.");
}
function err(err: any) {
  throw new Error("Function not implemented.");
}
