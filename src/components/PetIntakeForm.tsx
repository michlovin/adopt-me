import { useEffect, useState } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { SurrenderedPet } from "../models/SurrenderedPet";
import { database } from "../FireBase/FirebaseProvider";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";

import { postIntake } from "../services/intakeService";
import { TextCard } from "./TextCard";

export function PetIntakeForm() {
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const [pets, setPets] = useState<SurrenderedPet[]>([]);
  const surrenderCollectionRef = collection(database, "SurrenderedPets");
  const [submitSurrenders, setSubmitSurrenders] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [intakeValues, setintakeValues] = useState<SurrenderedPet>({
    date: 0,
    surrenderReason: "",
    petName: "",
    age: 0,
    breed: "",
    species: "",
    hasKids: false,
    hasOtherPets: false,
    otherPets: "",
    isFixed: false,
    gender: false,
    vet: "",
    vaccinations: "",
    healthConcerns: "",
    otherDescriptions: "",
  });

  //code fetches data from a Firestore collection (surrenderCollectionRef),
  //listens for any changes to that data, and updates the component's state (pets) accordingly.
  //It runs this process once when the component mounts.
  useEffect(() => {
    let queryRef = query(surrenderCollectionRef);
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log("No docs found");
      } else {
        let petsData: SurrenderedPet[] = querySnap.docs.map((doc) => {
          return { ...doc.data(), id: doc.id } as unknown as SurrenderedPet;
        });
        console.log(petsData, "Surrender DATA");
        setPets(petsData);
      }
    });
    return unsubscribe;
  }, []);

  //handles the changes to the form through destructing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setintakeValues((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      //Spread operator go though all the properties and fill everything in for me.
      //for the value that has the assigned name assign the value that i have stated
      setintakeValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  //handles clearing the form data
  function resetForm() {
    setintakeValues({
      date: 0,
      surrenderReason: "",
      petName: "",
      age: 0,
      breed: "",
      species: "",
      hasKids: false,
      hasOtherPets: false,
      otherPets: "",
      isFixed: false,
      gender: false,
      vet: "",
      vaccinations: "",
      healthConcerns: "",
      otherDescriptions: "",
    });
  }

  function onSubmit(e: any) {
    e.preventDefault();
    postIntake(intakeValues);
    setFormSubmitted(true);
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 2000);
    resetForm();
  }

  return (
    <>
      <TextCard />
      <div className="intakepage">
        <div className="text">
          <h2 className="title">
            Fill out the intake from for the Pet you wish to rehome
          </h2>
          <p className="paragraph">
            If you are a pet owner seeking assistance, our community services
            offer valuable resources. Should you find yourself unable to care
            for your animal, we encourage you to contact the Adopt Me. Please
            review the information on this page and complete the Surrender
            Intake Form. After submitting the form, we will reach out with
            further instructions.
          </p>
        </div>

        <Row>
          <Col lg={4}></Col>
          <Col lg={4}>
            {formSubmitted ? (
              <Alert>
                One of our team members will get back with you as soon as
                possible, thanks!
              </Alert>
            ) : (
              <Form onSubmit={onSubmit}>
                <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="number"
                    name="date"
                    value={intakeValues.date}
                    onChange={handleChange}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="surrenderReason">
                  <Form.Label>Reason for Surrender</Form.Label>
                  <Form.Control
                    type="text"
                    name="surrenderReason"
                    value={intakeValues.surrenderReason}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="petName">
                  <Form.Label>Animal Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="petName"
                    value={intakeValues.petName}
                    onChange={handleChange}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="age">
                  <Form.Label>Animal's Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    value={intakeValues.age}
                    onChange={handleChange}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="species">
                  <Form.Label>Species cat,dog,rabbit,bird ect</Form.Label>
                  <Form.Control
                    type="text"
                    name="species"
                    value={intakeValues.species}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="breed">
                  <Form.Label>Breed</Form.Label>
                  <Form.Control
                    type="text"
                    name="breed"
                    value={intakeValues.breed}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Check
                  type="checkbox"
                  id="hasKids"
                  label="Was you animal raised around children?"
                  name="hasKids"
                  checked={intakeValues.hasKids}
                  onChange={handleChange}
                />

                <Form.Check
                  type="checkbox"
                  id="hasOtherPets"
                  label="Has your animal been raised with other animals if yes list in next question?"
                  name="hasOtherPets"
                  checked={intakeValues.hasOtherPets}
                  onChange={handleChange}
                />

                <Form.Group controlId="otherPets">
                  <Form.Label>What types of pets in household</Form.Label>
                  <Form.Control
                    type="text"
                    name="otherPets"
                    value={intakeValues.otherPets}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Check
                  type="checkbox"
                  id="isFixed"
                  label="is your pet spayed or neutered?"
                  name="isFixed"
                  checked={intakeValues.isFixed}
                  onChange={handleChange}
                />

                <Form.Check
                  type="checkbox"
                  id="gender"
                  label="is your animal male or female?"
                  name="gender"
                  checked={intakeValues.gender}
                  onChange={handleChange}
                />

                <Form.Group controlId="vet">
                  <Form.Label>What is the name of vet</Form.Label>
                  <Form.Control
                    type="text"
                    name="vet"
                    value={intakeValues.vet}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="vaccinations">
                  <Form.Label>vaccinations?</Form.Label>
                  <Form.Control
                    type="text"
                    name="vaccinations"
                    value={intakeValues.vaccinations}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="healthConcerns">
                  <Form.Label>healthConcerns</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="healthConcerns"
                    value={intakeValues.healthConcerns}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="otherDescriptions">
                  <Form.Label>otherDescriptions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="otherDescriptions"
                    value={intakeValues.otherDescriptions}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button onClick={onSubmit} variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Col>
          <Col lg={3}></Col>
        </Row>
      </div>
      {/* Display surrendered pets */}
      <div>
        <h2>Surrendered Pets</h2>
        {pets.map((pet) => (
          <div>
            <h3>{pet.petName}</h3>
            <p>Breed: {pet.breed}</p>
            <p>Age: {pet.age}</p>
            <p>reason: {pet.surrenderReason}</p>
            <p>description: {pet.otherDescriptions}</p>
            <p>date: {pet.date}</p>
            <p>kids: {pet.hasKids}</p>
            <p>fixed: {pet.isFixed}</p>
          </div>
        ))}
      </div>
      );
    </>
  );
}
