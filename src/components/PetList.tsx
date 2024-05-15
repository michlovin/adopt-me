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
      return { ...petData, id } as Pet;
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
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  //parent of pet card
  //taking data from parent to child is props
  //UseEffect what do you want to do and when do you want to run it
  //go call the api and then grab all the pets from the api and take the state and update the state when the component first renders

  //fix this use effect do we really need unsubscribe here not sure it is being used
  //typecasting was used to force the type here because when data is fetch from the db you do not know what is coming so forcing type will fix this
  useEffect(() => {
    let queryRef = query(petsCollectionRef, orderBy("name"));
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log("No docs found");
      } else {
        let petsData: Pet[] = querySnap.docs.map((doc) => {
          return { ...doc.data(), id: doc.id } as Pet;
        });
        console.log(petsData, "PET DATA");
        setPets(petsData);
        setFilteredPets(petsData);
      }
    });
    return unsubscribe;
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const newpetList: any = pets.filter((pet: any) => {
      return (
        pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.species.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredPets(newpetList);
  }, [searchQuery]);

  return (
    <>
      <div className="petlist">
        <Auth />
        <input type="text" placeholder="Search..." onChange={onInputChange} />
        <HorizontialCard />
        <FullWidthImageBanner />
        <div className="grid-spacing">
          <Row>
            {filteredPets.map((pet: any) => (
              <Col lg={4}>
                <PetCard pet={pet} />
                <br />
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
