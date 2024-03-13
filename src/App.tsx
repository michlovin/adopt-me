import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Counter } from "./components/Counter";
import { PetList } from "./components/PetList";

function App() {
  return (
    <div className="App">
      <Header />
      <PetList />
      <Footer />
      <Counter />
    </div>
  );
}

export default App;
