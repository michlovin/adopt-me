import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
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
        <Link
          to={`/details/${props.pet.id}`}
          className="btn btn-secondary ml-2"
        >
          {props.pet.name}'s Details
        </Link>
      </Card.Footer>
    </Card>
  );
}
