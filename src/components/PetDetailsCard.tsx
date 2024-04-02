import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getPetById } from "../services/petService";
import { Pet } from "../models/Pet";

export default function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    if (id !== undefined) {
      getPetById(Number(id)).then((pet) => {
        setPet(pet);
      });
    }
  }, [id]);

  //to do:style this card better
  return (
    <div className="PetDetails">
      {pet && (
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <Card>
              <Card.Img
                className="img-fluid rounded-start"
                src={`img/${pet.image}`}
              ></Card.Img>
              <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Text>
                  {pet.breed} - {pet.isBoy ? "Boy" : "Girl"}
                </Card.Text>
                <Card.Text>{pet.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <button className="btn btn-success">Book A Viewing</button>

                <Link to={`/adoptions/${pet.id}`} className="btn btn-success">
                  {" "}
                  Adoption forms for {pet.name}
                </Link>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg={2}></Col>
        </Row>
      )}
    </div>
  );
}
