// LoginPage.js
import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../App.css";
import "../Global.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../App.js";
import { ClientContext } from "../App.js";
import CSRFToken from "../components/CSRFToken.js";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useContext(UserContext);
  const { client } = useContext(ClientContext);

  // Cookies.set('testCookie', 'testValue');
  // const testValue = Cookies.get('testCookie');
  // console.log('Test Cookie Value:', testValue);

  const submitLogin = (e) => {
    e.preventDefault();
    const csrfToken = Cookies.get("csrftoken");
    console.log("CSRF Token:", csrfToken);
    client
      .post(
        "/api/login",
        {
          email: email,
          password: password,
        },
        {
          mode: "cors",
          credentials: "include",
          // headers: {
          //   'Content-Type': 'application/json',
          //   'X-CSRFToken': csrfToken,
          // }
        }
      )
      .then(function (res) {
        console.log("Response headers:", res.headers);
        setCurrentUser(true);
      });
  };

  return (
    <>
      <Header />
        <div className="container-md bg-dark bg-card">
          <div className="center">
            <Form onSubmit={(e) => submitLogin(e)}>
              {/* <CSRFToken></CSRFToken> */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Adres email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Wprowadź email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Wprowadź hasło"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                className="btn btn-warning btn-rounded shadow"
                data-mdb-ripple-color="#ffffff"
                style={{ backgroundColor: "#f19c51", border: "none" }}
                type="submit"
              >
                Zatwierdź
              </Button>
            </Form>
          </div>
        </div>
      <Footer />
    </>
  );
};

export default LoginPage;
