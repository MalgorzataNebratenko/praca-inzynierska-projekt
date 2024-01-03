// AboutPage.js
import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "../Global.css";
import Header from "../components/Header";
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div>
      <Header/>
      <div className="container-lg bg-dark bg-card p-5">
        <div className="center" style={{display: "flex", flexDirection: "column"}}>
          <h2>About</h2>
          <p>Welcome to the Flashcard App!</p>
          <p>
            This application is designed to help you create, manage, and study
            flashcards efficiently.
          </p>
          <p>
            Whether you're preparing for exams, learning a new language, or
            exploring new topics, our app makes the process easy and effective.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
