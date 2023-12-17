// HomePage.js
import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import logo from '../images/logo1.png';
import '../App.css';
import '../Global.css';
import Header from '../components/Header';
import Cookies from 'js-cookie';

const HomePage = () => {
  const csrfToken = Cookies.get('csrftoken');
  console.log('CSRF Token:', csrfToken);
  return (
    <div>
    <Header></Header>
      <div className="center">
        <h2>You're logged in!</h2>
      </div>
    </div>
  );
};

export default HomePage;