import { useEffect, useState } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AdminForm } from "../models/AdminForm";
import { getPetById } from "../services/petService";
import { postAdopteeAdminService } from "../services/adopteeadminService";
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
  getDocs,
  DocumentData,
  Firestore,
} from "firebase/firestore";
import { database, useFirebase } from "../FireBase/FirebaseProvider";
import { Pet } from "../models/Pet";

//   import { useFirebase } from "../FirebaseProvider";
// import { useUserAuth } from "../context/UserAuthContext";

export function PetadoptionForm() {
  // eslint-disable-next-line no-unused-vars
  const [pet, setPet] = useState<Pet | null>(null);
  const { id } = useParams();
  //   const petsCollection = collection(database, "Adoptees");

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

  //get collection data
  // const petsDocuments = await getDocs(petsCollection);
  //   getDocs(petsCollection)
  //     .then((snapshot) => {
  //       let pets: { id: string; name: DocumentData }[] = []; //check this one out
  //       snapshot.docs.forEach((docs) => {
  //         pets.push({ id: docs.id, name: docs.data() });
  //       });
  //       console.log(pets, "pets");
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });

  //   //FETCHING PETS FROM DB
  //   async function getAllData(database: Firestore) {
  //     const petsCollection = collection(database, "Adoptees");
  //     const petSnapshot = await getDocs(petsCollection);
  //     const dbpetList = petSnapshot.docs.map((docs) => docs.data());
  //     console.log(dbpetList, "dbpetList HERE");
  //     return dbpetList;
  //   }

  //   //ADDING ADOPTION DOCUMENTS
  //   const addPetToAdoptionForm = document.querySelector(".add");
  //   addPetToAdoptionForm!.addEventListener("submit", (e) => {
  //     e.preventDefault();

  //     addDoc(petsCollection, {
  //       name: addPetToAdoptionForm?.name.value,
  //       description: addPetToAdoptionForm!.description.value,
  //     }).then(() => {
  //       addPetToAdoptionForm.reset;
  //     });
  //   });

  //   const addResto = async () => {
  //     try {
  //       let collectionRef = collection(db, "restaurants");
  //       await addDoc(collectionRef, {
  //         name: resto,
  //         type: type,
  //         contact: {
  //           address: address1,
  //           address2: address2,
  //           city: city,
  //           province: province,
  //           postal: postal,
  //           owner: { firstName: firstName, lastName: lastName },
  //           email: email,
  //           phoneNumber: phone,
  //         },
  //         ownerUid: user.uid,
  //       });
  //       console.log("Create business success!");
  //     } catch (ex) {
  //       console.log("FIRESTORE ADD FAILURE!", ex.message);
  //     }
  //   };

  useEffect(() => {
    if (id !== undefined) {
      getPetById(Number(id)).then((pet) => {
        return setPet(pet);
      });
    }
  }, [id]);

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
function petsCollection(petsCollection: any) {
  throw new Error("Function not implemented.");
}
