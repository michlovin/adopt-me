import { useState, useEffect, SetStateAction } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

export function PetSearch() {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((response) => {
      setAPIData(response.data);
    });
  }, []);

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
        // onChange={(e) => searchItems(e.target.value)}
      />
      {/* <Card>
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
      </Card> */}
    </div>
  );
}
