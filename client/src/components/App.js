import React from "react";
import Home from "./Home";
import Header from "./Header";
import "../styles/App.css";
import { UserProvider } from "../contexts/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewListing from "./NewListing";
import Listing from "./Listing";

export default function App() {
  return (
    <UserProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listing" element={<Listing />} />
            <Route path="/create-listing" element={<NewListing />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}
