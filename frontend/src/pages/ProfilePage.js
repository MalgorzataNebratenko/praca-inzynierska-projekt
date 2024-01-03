// ProfilePage.js
import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "../Global.css";
import Header from "../components/Header";
import Footer from '../components/Footer';

const ProfilePage = () => {
  return (
    <div>
      <Header/>
      <div className="container-lg bg-dark bg-card p-5">
        <div className="center" style={{display: "flex", flexDirection: "column"}}>
          <h2>It's Profile Page</h2>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
