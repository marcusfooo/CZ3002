import React from "react";
import ApiTest from "./ApiTest";
import "../styles/Home.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { AiOutlineSearch } from "react-icons/ai";
import Container from "react-bootstrap/esm/Container";

export default function Home() {
  return (
    <div className="home">
      <div className="bg"></div>
      <Form className="searchForm">
        <Container fluid="sm" className="form-container">
          <Row>
            <Col sm>
              <FloatingLabel label="Location">
                <Form.Control placeholder="Geylang" />
              </FloatingLabel>
            </Col>
            <Col sm>
              <FloatingLabel label="Type">
                <Form.Control placeholder="Geylang" />
              </FloatingLabel>
            </Col>
            <Col sm>
              <FloatingLabel label="People">
                <Form.Control placeholder="Geylang" />
              </FloatingLabel>
            </Col>
            <Col sm className="d-flex justify-content-end p-0">
              <Button type="submit" className="search-button">
                <AiOutlineSearch size={"1.5em"} />
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
      <h1 className="text-center text-white mt-5">Finding a home made easy</h1>
    </div>
  );
}
