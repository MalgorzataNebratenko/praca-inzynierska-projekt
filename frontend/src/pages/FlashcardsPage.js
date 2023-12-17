// FlashcardsPage.js
import React from 'react';
import { NavLink} from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import logo from '../images/logo1.png';
import '../App.css';
import '../Global.css';
import '../Flashcard.css'
import Header from '../components/Header';

const FlashcardsPage = () => {

  return (
    <div>
    <Header></Header>
      <div className="container-lg bg-dark bg-card">
        <div className="center">
          <h2>This is flashcard page</h2>
          <Button type="button" as={NavLink} to="/flashcards/create" className="btn btn-warning btn-rounded" data-mdb-ripple-color="#ffffff" style={{backgroundColor:'#f19c51', border:'none'}}>Stwórz nowy zestaw</Button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsPage;