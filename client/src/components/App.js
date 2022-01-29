import React from "react";
import Home from "./Home";
import Header from "./Header";
import "../styles/App.css";
import { UserProvider } from "../contexts/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewListing from "./NewListing";
import SGMap from "./SGMap";

export default function App() {
  return (
    <UserProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<SGMap />} />
            <Route path="/create-listing" element={<NewListing />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}
