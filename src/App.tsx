import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PetDetails from "./components/PetDetailsCard";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PetList } from "./components/PetList";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { PetIntakeForm } from "./components/PetIntakeForm";
import { AdminPetForm } from "./components/AdminPetForm";
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
          <Route path="/resources" element={<PetIntakeForm />}></Route>
          <Route
            path="/adminintake"
            element={<AdminPetForm edit={false} />}
          ></Route>
          <Route
            path="/editadminintake/:id"
            element={<AdminPetForm edit={true} />}
          ></Route>
          {/* <Route path="/events" element={<EventsPage />}></Route> */}
          {/* <Route path="/donate" element={<DonatePage/>}></Route> */}
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
