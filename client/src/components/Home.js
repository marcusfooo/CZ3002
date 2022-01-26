import React from "react";
import ApiTest from "./ApiTest";
import "../styles/Home.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { AiOutlineSearch } from "react-icons/ai";

export default function Home() {
  return (
    <div className="home">
      <div className="bg"></div>
      <ApiTest />
      <div className="form-container">
        <Form>
          <Row>
            <Col>
              <FloatingLabel label="Location">
                <Form.Control placeholder="Geylang" />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Type">
                <Form.Control placeholder="Geylang" />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="People">
                <Form.Control placeholder="Geylang" />
              </FloatingLabel>
            </Col>
            <Col className="d-flex justify-content-center p-0">
              <Button type="submit" className="search-button">
                <AiOutlineSearch size={"1.5em"} />
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <h3 className="text-center text-white mt-3">Finding a home made easy</h3>
    </div>
  );
}
