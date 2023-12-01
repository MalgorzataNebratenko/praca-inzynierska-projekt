// HomePage.js
import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import logo from '../images/logo1.png';
import '../App.css';
import '../Global.css';
import Header from '../components/Header';

const HomePage = ({client, setCurrentUser }) => {
  const submitLogout = (e) => {
    e.preventDefault();
    client.post(
      "/api/logout",
      {
        mode: 'cors',
        credentials: 'include'
      }).then(function (res) {
      setCurrentUser(false);
    });
  };

  return (
    <div>
    <Header submitLogout={submitLogout}></Header>
      <div className="center">
        <h2>You're logged in!</h2>
      </div>
    </div>
  );
};

export default HomePage;