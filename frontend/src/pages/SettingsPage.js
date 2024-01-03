// SettingsPage.js
import React, { useContext, useState, useEffect } from "react";
import { Form, Button, Col, Row, Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../App.js";
import { ClientContext } from "../App.js";
import Cookies from "js-cookie";
import CSRFToken from "../components/CSRFToken.js";

const SettingsPage = () => {
  const { setCurrentUser } = useContext(UserContext);
  const { client } = useContext(ClientContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayNationality, setDisplayNationality] = useState(false);
  const [dailyGoal, setDailyGoal] = useState("");
  const [publicAccount, setPublicAccount] = useState(false);

  useEffect(() => {
    // Fetch user settings when the component mounts
    const fetchUserSettings = async () => {
      try {
        const response = await client.get("/api/settings");
        const userSettings = response.data;
        
        // Set the state with the user's current settings
        setDisplayNationality(userSettings.display_nationality);
        setDailyGoal(userSettings.daily_goal.toString());
        setPublicAccount(userSettings.public_account);
      } catch (error) {
        console.error("Error fetching user settings:", error);
      }
    };

    fetchUserSettings();
  }, [client]); // Add client as a dependency to useEffect

  const saveGeneralSettings = (e) => {
    e.preventDefault();

    // Wysyłanie danych do API, możesz dostosować endpoint i dane zgodnie z Twoimi potrzebami
    client
      .post("/api/settings", {
        displayNationality,
        dailyGoal,
        publicAccount,
      })
      .then(function (res) {
        // Aktualizacja stanu aplikacji po zapisaniu ustawień
        setCurrentUser(/* nowe dane użytkownika */);
      });
  };

  const saveAccountSettings = (e) => {
    e.preventDefault();

    // Wysyłanie danych do API
    client
      .patch("/api/update_user/", {
        username,
        password,
      })
      .then(function (res) {
        // Aktualizacja stanu aplikacji po zapisaniu ustawień
        setCurrentUser(/* nowe dane użytkownika */);
      });
  };

  const handleDeleteAccount = () => {
    // Zleć funkcję usunięcia konta
    
    client
      .delete("/api/delete", {
        mode: "cors",
        credentials: "include",
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      })
      .then(function (res) {
        // Po udanym usunięciu konta, możesz przekierować użytkownika na stronę logowania
        // lub podjąć inne kroki
        console.log("chyba sie udalo");
      });
  };

  return (
    <div>
      <Header />
      <div className="container-lg bg-dark bg-card">
        <div
          className="center"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h2>Ustawienia</h2>
          <div id="settings-box">
            <Tabs
              defaultActiveKey="account"
              id="settings-tabs"
              className="mb-3 tabs-settings"
            >
              <Tab eventKey="account" title="Konto">
                <Form onSubmit={saveAccountSettings}>
                  <CSRFToken />
                  {/* Pole input do zmiany nazwy użytkownika */}
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Nazwa użytkownika</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Wprowadź nową nazwę"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  {/* Pole input do zmiany hasła użytkownika */}
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Wprowadź nowe hasło"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    className="btn btn-warning btn-rounded mt-3"
                    data-mdb-ripple-color="#ffffff"
                    style={{
                      backgroundColor: "#f19c51",
                      border: "none",
                      width: "100%",
                    }}
                  >
                    Zapisz ustawienia
                  </Button>
                </Form>
                <Form onSubmit={handleDeleteAccount}>
                    <CSRFToken />
                    <Button
                      type="submit"
                      className="btn btn-warning btn-rounded mb-3 mt-3"
                      data-mdb-ripple-color="#ffffff"
                      style={{ backgroundColor: "#f19c51", border: "none" }}
                    >
                      Usuń konto
                    </Button>
                  </Form>
              </Tab>
              {/* Pole checkbox czy wyświetlać narodowość użytkownika */}
              <Tab eventKey="general" title="Ogólne">
                <Form onSubmit={saveGeneralSettings}>
                  <Form.Group
                    className="mb-3"
                    controlId="formDisplayNationality"
                  >
                    <Form.Check
                      type="checkbox"
                      label="Wyświetlanie narodowości"
                      checked={displayNationality}
                      onChange={(e) => setDisplayNationality(e.target.checked)}
                    />
                  </Form.Group>

                  {/* Dzienny cel, group radio button */}
                  <Form.Group className="mb-3">
                    <Form.Label>Dzienny cel</Form.Label>
                    <Row>
                      <Col>
                        <Form.Check
                          type="radio"
                          label="20xp"
                          name="dailyGoal"
                          value="20"
                          checked={dailyGoal === "20"}
                          onChange={(e) => setDailyGoal(e.target.value)}
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          type="radio"
                          label="30xp"
                          name="dailyGoal"
                          value="30"
                          checked={dailyGoal === "30"}
                          onChange={(e) => setDailyGoal(e.target.value)}
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          type="radio"
                          label="40xp"
                          name="dailyGoal"
                          value="40"
                          checked={dailyGoal === "40"}
                          onChange={(e) => setDailyGoal(e.target.value)}
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          type="radio"
                          label="50xp"
                          name="dailyGoal"
                          value="50"
                          checked={dailyGoal === "50"}
                          onChange={(e) => setDailyGoal(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </Form.Group>

                  {/* Czy konto ma być publiczne */}
                  <Form.Group className="mb-3" controlId="formPublicAccount">
                    <Form.Check
                      type="checkbox"
                      label="Konto publiczne"
                      checked={publicAccount}
                      onChange={(e) => setPublicAccount(e.target.checked)}
                    />
                    <Form.Text
                      style={{
                        color: "rgb(240, 239, 239)",
                        fontSize: "12px",
                        fontStyle: "italic",
                      }}
                    >
                      (Twoje konto nie będzie widoczne w ogólnym rankingu.)
                    </Form.Text>
                  </Form.Group>

                  {/* Przycisk do zapisywania zmian */}
                  <Button
                    type="submit"
                    className="btn btn-warning btn-rounded"
                    data-mdb-ripple-color="#ffffff"
                    style={{
                      backgroundColor: "#f19c51",
                      border: "none",
                      width: "100%",
                    }}
                  >
                    Zapisz ustawienia
                  </Button>
                </Form>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
