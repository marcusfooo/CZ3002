import React from "react";
import "../styles/Home.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { AiOutlineSearch } from "react-icons/ai";
import Container from "react-bootstrap/esm/Container";
import { useForm } from "react-hook-form";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSearch = (data) => {
    console.log(data);
    navigate({
      pathname: "/listing",
      search: `?${createSearchParams(data)}`,
    });
  };
  return (
    <div className="home">
      <div className="bg"></div>
      <Form className="searchForm" onSubmit={handleSubmit(onSearch)}>
        <Container fluid="sm" className="form-container">
          <Row>
            <Col sm>
              <FloatingLabel label="Location">
                <Form.Control {...register("location")} placeholder="Geylang" />
              </FloatingLabel>
            </Col>
            <Col sm>
              <FloatingLabel label="Type">
                <Form.Control {...register("type")} placeholder="type" />
              </FloatingLabel>
            </Col>
            <Col sm>
              <FloatingLabel label="Number of Rooms">
                <Form.Control {...register("number")} placeholder="number" />
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
