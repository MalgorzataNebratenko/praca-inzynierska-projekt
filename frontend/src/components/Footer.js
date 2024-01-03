import React, { useState, useEffect, useContext } from "react";
import { Navbar, Container, Button, Nav, Dropdown } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../images/logo1.png";
import "../App.css";
import "../Global.css";

function Footer() {
    return (
      <div id="App-layout">
        <Navbar bg="dark" variant="dark" fixed="bottom">
          <Container>
            <h6 style={{color:"rgb(240, 239, 239)"}}>
                Zaprojektowanie i implementacja aplikacji internetowej do nauki języków obcych.
            </h6>
            <h6 style={{color:"rgb(240, 239, 239)"}}>
                Małgorzata Nebratenko
            </h6>
          </Container>
        </Navbar>
      </div>
    );
  }  

export default Footer;
