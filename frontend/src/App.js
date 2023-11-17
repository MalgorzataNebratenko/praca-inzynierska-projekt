import './App.css';
import './Global.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import FlagIcon from './FlagIcon.js'
import nationalities from './nationalities';
import logo from './logo.png';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function App() {

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [toggleContents, setToggleContents] = useState("Select a country");
  const [selectedCountry, setSelectedCountry] = useState();
  const [countries] = useState(nationalities);

  useEffect(() => {
    client.get("/api/user")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "/api/register",
      {
        email: email,
        username: username,
        password: password,
        nationality: selectedCountry
      }
    ).then(function(res) {
      client.post(
        "/api/login",
        {
          email: email,
          password: password
        }
      ).then(function(res) {
        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "/api/login",
      {
        email: email,
        password: password
      }
    ).then(function(res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/api/logout",
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(false);
    });
  }

  if (currentUser) {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
            <img
                src={logo}
                height="35"
                className="d-inline-block align-top"
                alt="Linguastine Logo"
              />{' '}
              <h3 className="logo-text d-inline-block fontKingAndQueen" >Linguastine</h3>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <form onSubmit={e => submitLogout(e)}>
                  <Button type="submit" class="btn btn-warning btn-rounded" data-mdb-ripple-color="#ffffff" style={{backgroundColor:'#febf67'}}>Log out</Button>
                </form>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
          <div className="center">
            <h2>You're logged in!</h2>
          </div>
        </div>
    );
  }
  return (
    <div id='App-layout'>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
        <img
                src={logo}
                height="35"
                className="d-inline-block align-top"
                alt="Linguastine Logo"
                />{' '}
                <h3 className="logo-text d-inline-block fontKingAndQueen">Linguastine</h3>
          </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button id="form_btn" onClick={update_form_btn} class="btn btn-warning btn-rounded shadow" data-mdb-ripple-color="#ffffff"  style={{backgroundColor: '#f78c45', border: 'none'}} >Register</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {
      registrationToggle ? (
        <div className="center">
          <Form onSubmit={e => submitRegistration(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
                <Dropdown
              onSelect={eventKey => {
                const { code, name } = countries.find(({ code }) => eventKey === code);
                
                setSelectedCountry(eventKey);
                setToggleContents(<><FlagIcon code={code}/> {name}</>);
              }}
            >
              <Dropdown.Toggle class="btn btn-warning btn-rounded shadow" data-mdb-ripple-color="#ffffff"  style={{backgroundImage: 'linear-gradient(90deg, rgba(222,106,53,1) 9%, rgba(241,156,81,1) 34%, rgba(255,187,125,1) 67%, rgba(255,226,153,1) 90%)', border: 'none',  width: '80%', marginBottom: '5%'}}  id="dropdown-flags" className="text-left">
                {toggleContents}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {countries.map(({ code, name }) => (
                    <Dropdown.Item key={code} eventKey={code}><FlagIcon code={code}/> {name}</Dropdown.Item>
                  ))}
                </div>
              </Dropdown.Menu>
            </Dropdown>
            <Button class="btn btn-warning btn-rounded shadow" data-mdb-ripple-color="#ffffff"  style={{backgroundColor: '#f78c45', border: 'none'}} type="submit">
              Submit
            </Button>
          </Form>
        </div>        
      ) : (
        <div className="center">
          <Form onSubmit={e => submitLogin(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button class="btn btn-warning btn-rounded shadow" data-mdb-ripple-color="#ffffff"  style={{backgroundColor: '#f78c45', border: 'none'}} type="submit">
              Submit
            </Button>
          </Form>
        </div>
      )
    }
    </div>
  );
}

export default App;