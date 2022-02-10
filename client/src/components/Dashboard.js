import axios from "../axios";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useSearchParams } from "react-router-dom";
import ListingCard from "./ListingCard";
import Row from "react-bootstrap/Row";
import "../styles/Dashboard.css";
import Map from "./Map";

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
    <Container fluid className="dashboard">
      <Row className="filter-bar">
        <h5>Filters</h5>
      </Row>
      <Row>
        <Col sm={7} className="list">
          {listings.map((listing, idx) => (
            <ListingCard {...listing} key={idx} />
          ))}
        </Col>
        <Col className="p-0">
          <Map />
        </Col>
      </Row>
    </Container>
  );
}
