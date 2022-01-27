import React from "react";
import Home from "./Home";
import Header from "./Header";
import "../styles/App.css";
import { UserProvider } from "../contexts/UserContext";

export default function App() {
  return (
    <UserProvider>
      <div className="App">
        <Header />
        <Home />
      </div>
    </UserProvider>
  );
}
