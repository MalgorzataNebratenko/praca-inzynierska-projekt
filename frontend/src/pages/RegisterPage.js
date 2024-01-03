// RegisterPage.js
import React, { useState, useContext } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import FlagIcon from "../FlagIcon";
import nationalities from "../nationalities";
import "../App.css";
import "../Global.css";
import Header from "../components/Header";
import Footer from '../components/Footer';
import { UserContext } from "../App.js";
import { ClientContext } from "../App.js";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toggleContents, setToggleContents] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [countries] = useState(nationalities);
  const { setCurrentUser } = useContext(UserContext);
  const { client } = useContext(ClientContext);

  const submitRegistration = (e) => {
    e.preventDefault();
    client
      .post(
        "/api/register",
        {
          email: email,
          username: username,
          password: password,
          nationality: selectedCountry,
        },
        {
          mode: "cors",
          credentials: "include",
        }
      )
      .then(function (res) {
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
            }
          )
          .then(function (res) {
            setCurrentUser(true);
          });
      });
  };

  return (
    <>
      <Header />
      <div className="container-md bg-dark bg-card">
        <div className="center">
          <Form onSubmit={(e) => submitRegistration(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Adres email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Wprowadź email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Nazwa użytkownika</Form.Label>
              <Form.Control
                type="text"
                placeholder="Wprowadź nazwę użytkownika"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <Form.Group className="mb-3">
              <Form.Label>Wybierz swoją narodowość</Form.Label>
              <Dropdown
                onSelect={(eventKey) => {
                  const { code, name } = countries.find(
                    ({ code }) => eventKey === code
                  );

                  setSelectedCountry(eventKey);
                  setToggleContents(
                    <>
                      <FlagIcon code={code} /> {name}
                    </>
                  );
                }}
              >
                <Dropdown.Toggle
                  className="text-left btn btn-warning btn-rounded shadow"
                  data-mdb-ripple-color="#ffffff"
                  style={{
                    backgroundColor: "#f19c51",
                    border: "none",
                    width: "100%",
                    marginBottom: "5%",
                  }}
                  id="dropdown-flags"
                >
                  {toggleContents}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <div style={{ maxHeight: "140px", overflowY: "auto" }}>
                    {countries.map(({ code, name }) => (
                      <Dropdown.Item key={code} eventKey={code}>
                        <FlagIcon code={code} /> {name}
                      </Dropdown.Item>
                    ))}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
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

export default RegisterPage;
