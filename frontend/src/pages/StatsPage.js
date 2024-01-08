// StatsPage.js
import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import logo from "../images/logo1.png";
import "../App.css";
import "../Global.css";
import Header from "../components/Header";
import Footer from '../components/Footer';

const StatsPage = () => {
  return (
    <div>
      <Header></Header>
      <div className="center">
        <h2>Here is stats page!</h2>
      </div>
      <Footer />
    </div>
  );
};

export default StatsPage;
