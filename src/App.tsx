import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PetDetails from "./components/PetDetailsCard";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Counter } from "./components/Counter";
import { PetList } from "./components/PetList";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
//todo pass props correctly from details card
function App() {
  return (
    <div className="App">
      <Header />
      <Footer />
      <Counter />
      <Router>
        <Routes>
          <Route path="/" element={<PetList></PetList>}></Route>
          <Route
            path="/details/:id"
            element={<PetDetails></PetDetails>}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
