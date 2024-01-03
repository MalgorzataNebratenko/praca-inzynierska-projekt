// FlashcardsPage.js
import React, { useState, useEffect, useContext } from "react";
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
import FlashcardDeck from "../components/FlashcardDeck";
import { ClientContext } from "../App.js";

const FlashcardsPage = () => {
  // const { setCurrentUser } = useContext(UserContext);
  const { client } = useContext(ClientContext);
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    // Dodaj zapytanie do API, aby pobrać zestawy fiszek użytkownika
    client.get("/api/decks/")
      .then(response => {
        setDecks(response.data);
      })
      .catch(error => {
        console.error("Error fetching decks:", error);
      });
  }, []);  // Pusta tablica oznacza, że useEffect wykonuje się tylko raz po zamontowaniu komponentu

  return (
    <div>
      <Header></Header>
      <div className="container-lg bg-dark bg-card">
        <div className="center" style={{display: "flex", flexDirection: "column"}}>
          <h2>Twoje zestawy fiszek</h2>
          <Button
            type="button"
            as={NavLink}
            to="/flashcards/create"
            className="btn btn-warning btn-rounded"
            data-mdb-ripple-color="#ffffff"
            style={{ backgroundColor: "#f19c51", border: "none" }}
          >
            Stwórz nowy zestaw
          </Button>
          <div className="decks-container">
          {/* Wyświetl wszystkie zestawy fiszek */}
          {decks.map(deck => (
            <FlashcardDeck key={deck.deck_id} deck={deck} />
          ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FlashcardsPage;
