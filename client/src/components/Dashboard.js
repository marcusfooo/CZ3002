import axios from "../axios";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useSearchParams } from "react-router-dom";
import ListingCard from "./ListingCard";

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function getListings() {
      const res = await axios.get("/api/listing", searchParams);
      console.log(res);
      setListings(res.data.listings);
    }
    getListings();
  }, [searchParams]);

  return (
    <Container>
      <Col>
        {listings.map((listing, idx) => (
          <ListingCard {...listing} key={idx} />
        ))}
      </Col>
      <Col></Col>
    </Container>
  );
}
