import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import axios from "../axios";

const exampleData = {
  title: "Luxurious studio in CBD",
  location: "Queenstown, Singapore",
  description:
    "The property is located at Queenstown, just a 5 minutes drive away from the Central Business District (CBD), making it perfect for office workers or expats. Minimum 3 months",
  price: 1900,
  seller: "user019273",
};

export default function Listing() {
  const { listingId } = useParams();

  useEffect(() => {
    async function getListingData() {
      const res = await axios.get(`/api/listing/${listingId}`);
      console.log(res);
    }
    getListingData();
  }, [listingId]);

  return (
    <Container>
      <Row>
        <h3>{exampleData.title}</h3>
      </Row>
      <Row>
        <p>{exampleData.location}</p>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
              <h4>Description</h4>
              <p>{exampleData.description}</p>
            </Col>
            <Col>
              <h4>${exampleData.price} SGD/month</h4>
            </Col>
          </Row>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              {exampleData.seller}
              <Button>Chat now</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
