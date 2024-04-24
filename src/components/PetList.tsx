import { useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Pet } from "../models/Pet";
import { getPets } from "../services/petService";
import { PetCard } from "./PetCard";
import "./css/petlist.css";
import { HorizontialCard } from "./HorizontalCard";
import { TextCard } from "./TextCard";
import { FullWidthImageBanner } from "./FullWidthImageBanner";
import { PetSearch } from "./PetSearch";
import handleSubmit from "../FireBase/firebasehandlesubmit";

export function PetList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const dataRef = useRef();
  //parent of pet card
  //taking data from parent to child is props
  //UseEffect what do you want to do and when do you want to run it
  //go call the api and then grab all the pets from the api and take the state and update the state when the component first renders

  useEffect(() => {
    getPets().then((pets) => setPets(pets));
  }, []);
  console.log(pets);

  const submithandler = (e) => {
    e.preventDefault();
    handleSubmit(dataRef.current.value);
    dataRef.current.value = "";
  };

  return (
    <>
      <form onSubmit={submithandler}>
        <input type="text" ref={dataRef} />
        <button type="submit">Save</button>
      </form>
      <div className="petlist">
        <PetSearch />
        <HorizontialCard />
        <Row>
          {pets.map((pet) => (
            <Col lg={4} className="grid-gap">
              <PetCard pet={pet} />
              <br />
            </Col>
          ))}
          <Col lg={4}></Col>
        </Row>
      </div>
      <FullWidthImageBanner />
      <TextCard />
    </>
  );
}
