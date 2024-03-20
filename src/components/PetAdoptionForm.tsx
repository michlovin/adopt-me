import { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Pet } from "../models/Pet";
import { AdoptionForm } from "../models/AdoptionForm";
import { getPetById } from "../services/petService";

export function PetadoptionForm() {
  // eslint-disable-next-line no-unused-vars
  const [pet, setPet] = useState<Pet | null>(null);

  const [formValues, setFormValues] = useState<AdoptionForm>({
    firstName: "",
    lastName: "",
    phoneNumer: "",
    email: "",
    fencedYard: false,
    hasKids: false,
    hasOtherPets: false,
    moreDescription: "",
  });

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      getPetById(Number(id)).then((pet) => {
        setPet(pet);
      });
    }
  }, [id]);

  //handles the changes to the form through destructing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    //Spread operator go though all the properties and fill everything in for me.
    //for the value that has the assigned name assign the value that i have stated
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // function onSubmit(e: React.ChangeEvent<HTMLInputElement>) {
  //   e.prevent.Default();
  //   postAdoption(formValues);
  //   setFormSubmitted(true);
  // }
  return (
    <div>
      <Row>
        <Col lg={3}></Col>
        <Col lg={6}>
          <Form>
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
          </Form>
        </Col>
        <Col lg={3}></Col>
      </Row>
    </div>
  );
}
