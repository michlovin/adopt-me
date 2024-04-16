import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PetDetails from "./components/PetDetailsCard";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PetList } from "./components/PetList";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { PetadoptionForm } from "./components/PetAdoptionForm";
import { PetIntakeForm } from "./components/PetIntakeForm";
import { Pagination } from "react-bootstrap";

//todo pass props correctly from details card
function App() {
  return (
    <div className="App">
      <Header />

      <Router>
        <Routes>
          <Route path="/" element={<PetList></PetList>}></Route>
          <Route
            path="/details/:id"
            element={<PetDetails></PetDetails>}
          ></Route>
          <Route path="/adoptions/:id" element={<PetadoptionForm />}></Route>
          <Route path="/petcare" element={<PetList></PetList>}></Route>
          <Route path="/resources" element={<PetList></PetList>}></Route>
          <Route path="/events" element={<PetIntakeForm />}></Route>
          <Route path="/donate" element={<PetIntakeForm />}></Route>
          <Route path="/intake" element={<PetIntakeForm />}></Route>
        </Routes>
      </Router>
      <Pagination />
      <Footer />
    </div>
  );
}

export default App;
