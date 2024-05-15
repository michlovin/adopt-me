import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { Pet } from "../models/Pet";
import { BsCalendar3 } from "react-icons/bs";
import "./css/petdetailscard.css";
import { BsClipboard2Check } from "react-icons/bs";

import { BsFileText } from "react-icons/bs";
import { getPetById } from "./PetList";
import { database } from "../FireBase/FirebaseProvider";

export default function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    const res = getPetById(database, id ?? "").then((data) => {
      setPet(data);
    });
  }, []);
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
                src={`/img/${pet.image}`}
              ></Card.Img>
              <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Text>
                  {pet.breed} - {pet.isBoy ? "Boy" : "Girl"}
                </Card.Text>
                <Card.Text>{pet.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <button className="btn btn-success">
                  <BsCalendar3 className="svg" />
                  Book A Viewing
                </button>

                <Link to={`/adoptions/${pet.id}`} className="btn btn-success">
                  {" "}
                  <BsClipboard2Check />
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
