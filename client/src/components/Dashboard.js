import axios from "../axios";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useSearchParams } from "react-router-dom";
import ListingCard from "./ListingCard";
import Row from "react-bootstrap/Row";
import "../styles/Dashboard.css";
import Map from "./Map";

const getCoords = async (listing) => {
  try {
    const res = await fetch(
      `https://developers.onemap.sg/commonapi/search?searchVal=${listing.postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
    );
    const results = await res.json();
    if (results.results.length > 0) {
      return [
        parseFloat(results.results[0]["LATITUDE"]),
        parseFloat(results.results[0]["LONGITUDE"]),
      ];
    } else {
      return;
    }
  } catch (err) {
    console.error("Failed to fetch coordinates");
  }
};

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    async function getListings() {
      const res = await axios.get("/api/listing", searchParams);
      console.log(res);
      setListings(res.data.listings);
      const coords = await Promise.all(
        res.data.listings.map(async (listing) => {
          const res = await getCoords(listing);
          return res;
        })
      );
      setCoords(coords.filter(Boolean));
    }
    getListings();
  }, [searchParams]);

  return (
    <Container fluid className="dashboard">
      <Row className="filter-bar">
        <h5>Filters</h5>
      </Row>
      <Row className="h-100">
        <Col sm={7} className="list">
          {listings.map((listing, idx) => (
            <ListingCard {...listing} key={idx} />
          ))}
        </Col>
        <Col className="p-0">
          <Map coords={coords} listings={listings} />
        </Col>
      </Row>
    </Container>
  );
}
