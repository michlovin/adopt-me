import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Pet } from "../models/Pet";
import { getPetById } from "../services/petService";

export function PetadoptionForm() {
  const [pet, setPet] = useState<Pet | null>(null);
  const { id } = useParams();
  const [firstName, setFirstName] = useState<string>("");

  useEffect(() => {
    if (id !== undefined) {
      getPetById(Number(id)).then((pet) => {
        setPet(pet);
      });
    }
  }, [id]);

  return (
    <div>
      <Form>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setsetFirstName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
}
function setsetFirstName(value: string): void {
  throw new Error("Function not implemented.");
}
