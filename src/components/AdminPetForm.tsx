import { useEffect, useState } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AdminForm } from "../models/AdminForm";
import { postAdopteeAdminService } from "../services/adopteeadminService";
import { Pet } from "../models/Pet";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { database } from "../FireBase/FirebaseProvider";

export function AdminPetForm() {
  // eslint-disable-next-line no-unused-vars
  const [pets, setPets] = useState<Pet[]>([]);
  const { id } = useParams();
  //collection references for pets
  const petsCollection = collection(database, "Adoptees");

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<AdminForm>({
    name: "",
    species: "",
    age: 0,
    description: "",
    image: "",
    breed: "",
    gender: "",
    color: "",
    availability: true,
    lifeStage: "",
    intakeDate: "",
  });

  //handles the changes to the form through destructing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormValues((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      //Spread operator go though all the properties and fill everything in for me.
      //for the value that has the assigned name assign the value that i have stated
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  function onSubmit(e: any) {
    e.preventDefault();
    postAdopteeAdminService(formValues);
    setFormSubmitted(true);
  }

  return (
    <div>
      <div>Fill out the intake from for this Pet</div>
      <Row>
        <Col lg={3}></Col>
        <Col lg={4}>
          {formSubmitted ? (
            <Alert>Form was Submitted Sucessfully by Admin</Alert>
          ) : (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="species">
                <Form.Label>Species</Form.Label>
                <Form.Control
                  type="text"
                  name="species"
                  value={formValues.species}
                  onChange={handleChange}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={formValues.age}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="moreDescription"
                  value={formValues.description}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={formValues.image}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="breed">
                <Form.Label>Breed</Form.Label>
                <Form.Control
                  type="text"
                  name="breed"
                  value={formValues.breed}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  type="text"
                  name="gender"
                  value={formValues.gender}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="color">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  type="text"
                  name="color"
                  value={formValues.color}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="color">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  type="text"
                  name="color"
                  value={formValues.color}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Check
                type="checkbox"
                id="availability"
                label="available for adoption"
                name="availability"
                checked={formValues.availability}
                onChange={handleChange}
              />

              <Form.Group controlId="lifeStage">
                <Form.Label>Life Stage</Form.Label>
                <Form.Control
                  type="text"
                  name="availability"
                  value={formValues.lifeStage}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="intakeDate">
                <Form.Label>intake Date</Form.Label>
                <Form.Control
                  type="text"
                  name="intakeDate"
                  value={formValues.intakeDate}
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
  );
}
function petsCollection(petsCollection: any) {
  throw new Error("Function not implemented.");
}
