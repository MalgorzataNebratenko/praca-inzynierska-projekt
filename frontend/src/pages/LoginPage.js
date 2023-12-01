// LoginPage.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../App.css';
import '../Global.css';
import Header from '../components/Header';

const LoginPage = ({client, setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = (e) => {
    e.preventDefault();
    client.post(
      "/api/login",
      {
        email: email,
        password: password
      },
      {
        mode: 'cors',
        credentials: 'include'
      })
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
              <Form onSubmit={e => submitLogin(e)}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                  </Form.Group>
                  <Button className="btn btn-warning btn-rounded shadow" data-mdb-ripple-color="#ffffff"  style={{backgroundColor: '#f19c51', border: 'none'}} type="submit">
                  Submit
                  </Button>
              </Form>
      </div>
    </div>
    </>
  );
};

export default LoginPage;