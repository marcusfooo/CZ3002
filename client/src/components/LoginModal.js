import React, { useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/LoginModal.css";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Container from "react-bootstrap/esm/Container";
import axios from "../axios";
import { useUser } from "../contexts/UserContext";

const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("Email is invalid")
      .required("Please enter your email"),
    password: yup.string().required("Password cannot be empty"),
  })
  .required();

const signupSchema = yup
  .object({
    email: yup
      .string()
      .email("Email is invalid")
      .required("Email must not be empty"), //ntu domain exists at the endof string
    password: yup.string().required("Password cannot be empty."),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match."),
  })
  .required();

export default function LoginModal() {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const { setCurrentUser } = useUser();
  const {
    handleSubmit: handleSignupSubmit,
    control: signupControl,
    formState: { errors: signupErrors },
  } = useForm({ resolver: yupResolver(signupSchema) });
  const {
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    control: loginControl,
  } = useForm({ resolver: yupResolver(loginSchema) });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const signupSubmit = async (data) => {
    try {
      const res = await axios.post("/api/signup", data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      setCurrentUser({
        id: data.id,
        email: data.email,
        password: res.data.password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loginSubmit = async (data) => {
    try {
      const res = await axios.post("/api/login", data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      setCurrentUser({
        id: data.id,
        email: data.email,
        password: res.data.password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavDropdown.Item variant="primary" onClick={handleShow}>
        Login/Signup
      </NavDropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div className="tabs">
            <div
              onClick={() => setActiveTab(0)}
              className={activeTab === 0 ? "active" : ""}
            >
              Login
            </div>
            <div
              onClick={() => setActiveTab(1)}
              className={"ml-4 " + (activeTab === 1 ? "active" : "")}
            >
              Signup
            </div>
            <div
              className={
                "indicator " + (activeTab === 0 ? null : "indicatorRight")
              }
            ></div>
          </div>
        </Modal.Header>
        <Modal.Body className="tabBody">
          <Form
            noValidate
            onSubmit={handleLoginSubmit(loginSubmit)}
            className={"form " + (activeTab === 0 ? "activeBody" : null)}
          >
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email address</Form.Label>
              <Controller
                name="email"
                control={loginControl}
                render={({
                  field: { ref, name, onChange, onBlur },
                  fieldState: { invalid },
                }) => (
                  <Form.Control
                    isInvalid={invalid}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                    type="email"
                    placeholder="Enter email"
                  />
                )}
              />
              <p className="text-danger">{loginErrors.email?.message}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Controller
                control={loginControl}
                name="password"
                render={({
                  field: { name, ref, onChange, onBlur },
                  fieldState: { invalid },
                }) => (
                  <Form.Control
                    isInvalid={invalid}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                    type="password"
                    placeholder="Password"
                  />
                )}
              />
              <p className="text-danger">{loginErrors.password?.message}</p>
            </Form.Group>
            <Container className="p-0 d-flex justify-content-between">
              <Button type="submit" variant="primary">
                Login
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Container>
          </Form>
          <Form
            onSubmit={handleSignupSubmit(signupSubmit)}
            className={"form " + (activeTab === 1 ? "activeBody" : null)}
          >
            <Form.Group className="mb-3" controlId="signupEmail">
              <Controller
                control={signupControl}
                name="email"
                render={({
                  field: { name, ref, onChange, onBlur },
                  fieldState: { invalid },
                }) => (
                  <Form.Control
                    onChange={onChange}
                    onBlur={onBlur}
                    isInvalid={invalid}
                    name={name}
                    ref={ref}
                    type="email"
                    placeholder="Email"
                  />
                )}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>

              <p className="text-danger">{signupErrors.email?.message}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="signupPassword">
              <Controller
                control={signupControl}
                name="password"
                render={({
                  field: { name, ref, onChange, onBlur },
                  fieldState: { invalid },
                }) => (
                  <Form.Control
                    onBlur={onBlur}
                    onChange={onChange}
                    isInvalid={invalid}
                    name={name}
                    ref={ref}
                    type="password"
                    placeholder="Password"
                  />
                )}
              />
              <p className="text-danger">{signupErrors.password?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="signuoPasswordConfirm">
              <Controller
                control={signupControl}
                name="passwordConfirm"
                render={({
                  field: { name, ref, onChange, onBlur },
                  fieldState: { invalid },
                }) => (
                  <Form.Control
                    onBlur={onBlur}
                    onChange={onChange}
                    isInvalid={invalid}
                    name={name}
                    ref={ref}
                    type="password"
                    placeholder="Confirm Password"
                  />
                )}
              />
              <p className="text-danger">
                {signupErrors.passwordConfirm?.message}
              </p>
            </Form.Group>
            <Container className="p-0 d-flex justify-content-between">
              <Button
                variant="primary"
                onClick={handleSignupSubmit(signupSubmit)}
              >
                Submit
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
