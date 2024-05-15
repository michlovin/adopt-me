import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Pet } from "../models/Pet";
import "./css/petcard.css";
import { BsSuitHeart } from "react-icons/bs";
import { BsPlusCircle } from "react-icons/bs";
import { CalenderModal } from "./CalenderModal";
import React, { useState } from "react";
import { database } from "../FireBase/FirebaseProvider";
import { collection, deleteDoc, doc } from "firebase/firestore";

//using props to bring in information
//defining the structure of data you can intake
interface PetCardProps {
  pet: Pet;
}

export function PetCard(props: PetCardProps) {
  const petsCollection = collection(database, "Adoptees");

  // const deleteAdminPetFromDB = async (id: string) => {
  //   console.log(database, "TESTING FB");
  //   try {
  //     await deleteDoc(doc(database, "Adoptees", id));
  //     console.log("Pet deleted successfully from admin intake/pet list!");
  //   } catch (error) {
  //     console.error("Error deleting pet:");
  //   }
  // };

  // const deleteAdminPetFromDB = async (id: string) => {
  //   console.log(database, "TESTING FB");
  //   try {
  //     await deleteDoc(doc(database, "Adoptees", id));
  //     console.log("Pet deleted successfully from admin intake/pet list!");
  //   } catch (error) {
  //     console.error("Error deleting pet:");
  //   }
  // };

  const deleteAdminPetFromDB = async (id: string) => {
    console.log(id, "ID IS HERE");
    const res = await deleteDoc(doc(database, "Adoptees", id));
  };

  return (
    <Card className="space-below">
      <Card.Img
        variant="top"
        src={`img/${props.pet.image}`}
        className="card-img"
      ></Card.Img>

      <Card.Body>
        <BsSuitHeart />
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
        <button
          onClick={() => deleteAdminPetFromDB(props.pet.id)}
          className="btn btn-warning ml-2"
        >
          <BsPlusCircle className="svg" />
          Delete {props.pet.name}
        </button>
        <Link
          to={`/editadminintake/${props.pet.id}`}
          className="btn btn-success ml-2"
        >
          <BsPlusCircle className="svg" />
          Edit {props.pet.name}
        </Link>
        <></>
      </Card.Footer>
    </Card>
  );
}
