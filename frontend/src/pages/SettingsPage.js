// SettingsPage.js
import React, { useContext, useState } from 'react';
import { Form, Button, Dropdown, Col, Row, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Header from '../components/Header';
import { UserContext } from '../App.js';
import { ClientContext } from '../App.js';
import Cookies from 'js-cookie';
import CSRFToken from '../components/CSRFToken.js';

const SettingsPage = () => {
  const { setCurrentUser } = useContext(UserContext);
  const { client } = useContext(ClientContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayNationality, setDisplayNationality] = useState(false);
  const [dailyGoal, setDailyGoal] = useState('');
  const [publicAccount, setPublicAccount] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();

    // Wysyłanie danych do API, możesz dostosować endpoint i dane zgodnie z Twoimi potrzebami
    client.post('/api/settings', {
      username,
      password,
      displayNationality,
      dailyGoal,
      publicAccount,
    }).then(function (res) {
      // Aktualizacja stanu aplikacji po zapisaniu ustawień
      setCurrentUser(/* nowe dane użytkownika */);
    });
  };

  const handleDeleteAccount = () => {
    // Zleć funkcję usunięcia konta
    axios.delete('/api/delete',{
      mode: 'cors',
      credentials: 'include',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      }
    },).then(function (res) {
      // Po udanym usunięciu konta, możesz przekierować użytkownika na stronę logowania
      // lub podjąć inne kroki
      console.log("chyba sie udalo")
    });
  };

  return (
    <div>
      <Header />
      <div className="container-lg bg-dark bg-card">
        <div className="center" style={{display: 'flex', flexDirection:'column'}}>
          <h2>Settings</h2>
          <div id="settings-box">
            <Form onSubmit={handleSaveSettings}>
              <CSRFToken />
              {/* Pole input do zmiany nazwy użytkownika */}
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              {/* Pole input do zmiany hasła użytkownika */}
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              {/* Pole checkbox czy wyświetlać narodowość użytkownika */}
              <Form.Group className="mb-3" controlId="formDisplayNationality">
                <Form.Check
                  type="checkbox"
                  label="Display nationality"
                  checked={displayNationality}
                  onChange={(e) => setDisplayNationality(e.target.checked)}
                />
              </Form.Group>

              {/* Dzienny cel, group radio button */}
              <Form.Group className="mb-3">
                <Form.Label>Daily Goal</Form.Label>
                <Row>
                  <Col>
                    <Form.Check
                      type="radio"
                      label="20xp"
                      name="dailyGoal"
                      value="20"
                      checked={dailyGoal === '20'}
                      onChange={(e) => setDailyGoal(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type="radio"
                      label="30xp"
                      name="dailyGoal"
                      value="30"
                      checked={dailyGoal === '30'}
                      onChange={(e) => setDailyGoal(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type="radio"
                      label="40xp"
                      name="dailyGoal"
                      value="40"
                      checked={dailyGoal === '40'}
                      onChange={(e) => setDailyGoal(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type="radio"
                      label="50xp"
                      name="dailyGoal"
                      value="50"
                      checked={dailyGoal === '50'}
                      onChange={(e) => setDailyGoal(e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Group>

              {/* Czy konto ma być publiczne */}
              <Form.Group className="mb-3" controlId="formPublicAccount">
                <Form.Check
                  type="checkbox"
                  label="Public Account"
                  checked={publicAccount}
                  onChange={(e) => setPublicAccount(e.target.checked)}
                />
                <Form.Text style={{color: 'rgb(240, 239, 239)', fontSize: '12px', fontStyle: 'italic'}}>
                  (Your account won't be included in the overall ranking.)
                </Form.Text>
              </Form.Group>

              {/* Przycisk do zapisywania zmian */}
              <Button
                type="submit"
                className="btn btn-warning btn-rounded"
                data-mdb-ripple-color="#ffffff"
                style={{ backgroundColor: '#f19c51', border: 'none' }}
              >
                Save Settings
              </Button>
            </Form>
            <Form onSubmit={handleDeleteAccount}>
              <CSRFToken/>
              <Button
                type="submit"
                className="btn btn-warning btn-rounded"
                data-mdb-ripple-color="#ffffff"
                style={{ backgroundColor: '#f19c51', border: 'none' , marginLeft: '30px'}}
              >
                Delete Account
              </Button>
            </Form>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
