import { useState, useEffect, SetStateAction } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { database } from "../FireBase/FirebaseProvider";
import { Pet } from "../models/Pet";

export function PetSearch() {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const petsCollection = collection(database, "Adoptees");
  const [pets, setPets] = useState<Pet[]>([]);

  // useEffect(() => {
  //   axios.get(`https://jsonplaceholder.typicode.com/users`).then((response) => {
  //     setAPIData(response.data);
  //   });
  // }, []);

  useEffect(() => {
    let queryRef = query(petsCollection, orderBy("name"));
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log("No docs found");
      } else {
        let petsData: Pet[] = querySnap.docs.map((doc) => {
          // let pet: Pet = ...doc.data();
          return { ...doc.data() } as Pet;
        });
        console.log(petsData, "PET DATA");
        setPets(petsData);
      }
    });
    return unsubscribe;
  }, []);

  // function setPets(petsData: Pet[]) {
  //   throw new Error("Function not implemented.");
  // }

  const searchItems = (searchValue: SetStateAction<string>) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <input
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
      />
      <Card>
        {searchInput.length > 1
          ? filteredResults.map((item) => {
              return (
                <Card>
                  <Card.Body>
                    <Card.Header>{item}</Card.Header>
                    <Card.Text>{item}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })
          : APIData.map((item) => {
              return (
                <Card>
                  <Card.Body>
                    <Card.Header>{item}</Card.Header>
                    <Card.Text>{item}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
      </Card>
    </div>
  );
}
