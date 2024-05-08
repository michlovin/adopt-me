import { useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Pet } from "../models/Pet";

import { PetCard } from "./PetCard";
import "./css/petlist.css";
import { HorizontialCard } from "./HorizontalCard";
import { TextCard } from "./TextCard";
import { FullWidthImageBanner } from "./FullWidthImageBanner";
import { PetSearch } from "./PetSearch";
import handleSubmit from "../FireBase/firebasehandlesubmit";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { database } from "../FireBase/FirebaseProvider";

export function PetList() {
  const dataRef = useRef<HTMLInputElement>(null);
  const [pets, setPets] = useState<Pet[]>([]); //this is wrong
  const petsCollection = collection(database, "Adoptees");
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

  useEffect(() => {
    let queryRef = query(petsCollection, orderBy("name"));
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log("No docs found");
      } else {
        let petsData = querySnap.docs.map((doc) => {
          return { ...doc.data() };
        });
        setPets(petsData);
        console.log(petsData, "PET DATA");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <form onSubmit={submithandler}>
        <input type="text" ref={dataRef} />
        <button type="submit">Save</button>
      </form>
      <div className="petlist">
        <PetSearch />
        <HorizontialCard />
        <div className="grid-spacing">
          <Row>
            {pets.map((pet) => (
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
function setHeroes(heroesData: { DOC_ID: string }[]) {
  throw new Error("Function not implemented.");
}
