import { Card } from "react-bootstrap";
import { Pet } from "../models/Pet";
import "./css/petcard.css";

//using props to bring in information

//defining the structure of data you can intake
interface PetCardProps {
  pet: Pet;
}

export function PetCard(props: PetCardProps) {
  return (
    <Card>
      <Card.Img variant="top" src={`img/${props.pet.image}`}></Card.Img>

      <Card.Body>
        <Card.Title>
          {props.pet.name}
          <br />
          {props.pet.breed}
        </Card.Title>
        {props.pet.description}
      </Card.Body>
      <Card.Footer>
        <button className="btn btn-primary">Book A Viewing</button>
        {/* <button className="btn btn-primary">Adopt Me</button>
        <button className="btn btn-primary">Details</button> */}
      </Card.Footer>
    </Card>
  );
}
