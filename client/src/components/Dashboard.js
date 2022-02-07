import axios from "../axios";
import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useSearchParams } from "react-router-dom";

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function getListings() {
      const res = await axios.get("/api/listing", searchParams);
      console.log(res);
    }
    getListings();
  }, [searchParams]);

  return (
    <Container>
      <Col></Col>
      <Col></Col>
    </Container>
  );
}
