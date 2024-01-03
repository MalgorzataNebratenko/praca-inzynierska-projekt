// LessonsPage.js
import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import logo from "../images/logo1.png";
import "../App.css";
import "../Global.css";
import "../Flashcard.css";
import Header from "../components/Header";
import Footer from '../components/Footer';

const LessonsPage = () => {
  return (
    <div>
      <Header></Header>
      <div className="container-lg bg-dark bg-card">
        <div className="center" style={{display: "flex", flexDirection: "column"}}>
          <h2>This is lessons page</h2>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LessonsPage;