import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Pet } from "../models/Pet";
import { getPets } from "../services/petService";
import { PetCard } from "./PetCard";
import "./css/petlist.css";
import { Link } from "react-router-dom";

export function PetList() {
  const [pets, setPets] = useState<Pet[]>([]);
  //parent of pet card
  //taking data from parent to child is props
  //UseEffect what do you want to do and when do you want to run it
  //go call the api and then grab all the pets from the api and take the state and update the state when the component first renders

  useEffect(() => {
    getPets().then((pets) => setPets(pets));
  }, []);
  console.log(pets);

  return (
    <div className="PetList">
      <Link to={`/intake`} className="btn btn-primary">
        {" "}
        surrender
      </Link>
      <Row>
        {pets.map((pet) => (
          <Col lg={4} className="grid-gap">
            <PetCard pet={pet} />
          </Col>
        ))}
        <Col lg={4}></Col>
      </Row>
    </div>
  );
}
