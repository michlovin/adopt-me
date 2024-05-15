import { useEffect, useState } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AdminForm } from "../models/AdminForm";
import {
  editAdminPet,
  postAdopteeAdminService,
} from "../services/adopteeadminService";
import { Pet } from "../models/Pet";
import {
  collection,
  DocumentData,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { database } from "../FireBase/FirebaseProvider";
import { PetList } from "./PetList";
import { TextCard } from "./TextCard";
import "./css/adminpetform.css";

interface AdminPetProps {
  edit: boolean;
}

export function AdminPetForm(props: AdminPetProps) {
  // eslint-disable-next-line no-unused-vars
  const [pets, setPets] = useState<Pet[]>([]);
  const { id } = useParams();
  //collection references for pets
  const petsCollection = collection(database, "Adoptees");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
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

  //updated form state
  const [updatedName, setupdatedName] = useState("");
  const [updatedDescription, setupdatedDescription] = useState("");
  const [updatedAge, setupdatedAge] = useState("");

  //handles clearing the form data
  function resetForm() {
    setFormValues({
      name: "",
      species: "",
      age: 0,
      description: "",
      image: "",
      breed: "",
      gender: "",
      color: "",
      availability: true,
      intakeDate: "",
    });
  }

  useEffect(() => {
    const getPet = async () => {
      if (id) {
        const docRef = doc(database, "Adoptees", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const pet = docSnap.data();
          setFormValues({
            name: pet.name,
            species: pet.species,
            age: pet.age,
            description: pet.description,
            image: pet.image,
            breed: pet.breed,
            gender: pet.gender,
            color: pet.color,
            availability: pet.availability,
            intakeDate: pet.intakeDate,
          });
        } else {
          console.log("No such document!");
        }
      }
    };
    if (id) {
      getPet();
    }
  }, [id]);

  function onSubmit(e: any) {
    e.preventDefault();
    if (props.edit && id) {
      editAdminPet(id, formValues);
    } else {
      postAdopteeAdminService(formValues);
    }
    setFormSubmitted(true);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 2000);
    resetForm();
  }

  return (
    <div>
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
            {formSubmitted && submitSuccess ? (
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
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                  ></Form.Control>
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
                <Form.Check
                  type="checkbox"
                  id="availability"
                  label="available for adoption"
                  name="availability"
                  checked={formValues.availability}
                  onChange={handleChange}
                />

                <Form.Group controlId="intakeDate">
                  <Form.Label>intake Date</Form.Label>
                  <Form.Control
                    type="text"
                    name="intakeDate"
                    value={formValues.intakeDate}
                    onChange={handleChange}
                  />
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

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Default file input example</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                <Button onClick={onSubmit} variant="secondary" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Col>
          <Col lg={4}></Col>
        </Row>
      </div>
    </div>
  );
}
