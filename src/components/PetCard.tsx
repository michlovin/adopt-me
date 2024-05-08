import { Button, Card, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Pet } from "../models/Pet";
import "./css/petcard.css";
import { BsSuitHeart } from "react-icons/bs";
import { BsPlusCircle } from "react-icons/bs";
import { BsCalendar3 } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { CalenderModal } from "./CalenderModal";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FireBase/FirebaseProvider";

//using props to bring in information

//defining the structure of data you can intake
interface PetCardProps {
  pet: Pet;
}

export function PetCard(props: PetCardProps) {
  const [modalShow, setModalShow] = React.useState(false);

  //get collection data for pets

  // useEffect(() => {
  //   getDocs(petsCollection)
  //     .then((snapshot) => {
  //       let Petpoop: { id: string; name: DocumentData }[] = [];
  //       snapshot.docs.forEach((docs) => {
  //         Petpoop.push({ id: docs.id, name: docs.data() });
  //       });
  //       console.log(pets, "pets");
  //       setPets(Petpoop);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  return (
    <Card className="space-below">
      <Card.Img
        variant="top"
        src={`img/${props.pet.image}`}
        className="card-img"
      ></Card.Img>

      <Card.Body>
        <Card.Title>
          {props.pet.name}
          <br />
          {props.pet.breed}
        </Card.Title>
        {props.pet.description}
      </Card.Body>
      <Card.Footer className="space-below">
        <CalenderModal />
        <Link to={`/details/${props.pet.id}`} className="btn btn-success ml-2">
          <BsPlusCircle className="svg" />
          {props.pet.name}'s Details
        </Link>
        <BsSuitHeart />
        <></>
      </Card.Footer>
    </Card>
  );
}
