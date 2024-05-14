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
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { database } from "../FireBase/FirebaseProvider";
import { Auth } from "./auth";

export function PetList() {
  const dataRef = useRef<HTMLInputElement>(null);
  const [pets, setPets] = useState<Pet[]>([]); //yay this is not wrong
  const petsCollection = collection(database, "Adoptees");
  console.log(pets, "is this pets");
  const [filteredPets, setFilteredPets] = useState([]);
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
    let queryRef = query(petsCollection, orderBy("name"));
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log("No docs found");
      } else {
        let petsData: Pet[] = querySnap.docs.map((doc) => {
          // let pet: Pet = ...doc.data();
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
function setPets(PetsData: { DOC_ID: string }[]) {
  throw new Error("Function not implemented.");
}
