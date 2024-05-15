import { useEffect, useState } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Pet } from "../models/Pet";
import { AdoptionForm } from "../models/AdoptionForm";
import { postAdoption } from "../services/adoptionService";
import "./css/petadoptionform.css";

export function PetadoptionForm() {
  // eslint-disable-next-line no-unused-vars
  const [pet, setPet] = useState<Pet | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<AdoptionForm>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    fencedYard: false,
    hasKids: false,
    hasOtherPets: false,
    moreDescription: "",
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

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    postAdoption(formValues);
    setFormSubmitted(true);
  }

  return (
    <div>
      <div>Fill out the adoption form for this animal</div>
      <Row>
        <Col lg={3}></Col>
        <Col lg={4}>
          {formSubmitted ? (
            <Alert>
              One of our team members will get back with you as soon as
              possible, thanks!
            </Alert>
          ) : (
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleChange}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleChange}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={formValues.phoneNumber}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                ></Form.Control>
              </Form.Group>

              {pet?.animalType === "dog" && (
                <Form.Check
                  type="checkbox"
                  id="fencedYard"
                  label="Do you have a fenced yard?"
                  name="fencedYard"
                  checked={formValues.fencedYard}
                  onChange={handleChange}
                />
              )}

              <Form.Check
                type="checkbox"
                id="hasKids"
                label="Do you have children?"
                name="hasKids"
                checked={formValues.hasKids}
                onChange={handleChange}
              />

              <Form.Check
                type="checkbox"
                id="hasOtherPets"
                label="Do you have other pets?"
                name="hasOtherPets"
                checked={formValues.hasOtherPets}
                onChange={handleChange}
              />

              <Form.Group controlId="moreDescription">
                <Form.Label>Tell Us More About yourself</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="moreDescription"
                  value={formValues.moreDescription}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
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
