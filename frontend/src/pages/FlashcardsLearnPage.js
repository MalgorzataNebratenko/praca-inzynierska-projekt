// DeckDetailsPage.js
import React, { useEffect, useState, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { ClientContext } from "../App.js";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FlashcardExcersise from "../components/FlashcardExcersise.js";
import { Button } from "react-bootstrap";

const FlashcardsLearnPage = () => {
  const { deckId } = useParams();
  const [deckDetails, setDeckDetails] = useState(null);
  const { client } = useContext(ClientContext);
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    // Pobierz szczegóły danego zestawu z API na podstawie deckId
    client
      .get(`/api/deck/${deckId}`)
      .then((response) => {
        setDeckDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching deck details:", error);
      });

    // Pobierz fiszki powiązane z danym zestawem
    client
      .get(`/api/deck/${deckId}/flashcards/`)
      .then((response) => {
        setFlashcards(response.data);
      })
      .catch((error) => {
        console.error("Error fetching flashcards:", error);
      });
  }, [deckId, client]);

  if (!deckDetails || !flashcards) {
    return <p>Loading...</p>;
  }


  return (
    <div>
      <Header></Header>
      <div className="container-lg bg-dark bg-card">
        <div
          className="center"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h2>{deckDetails.name}</h2>
          <FlashcardExcersise deckId={deckId}></FlashcardExcersise>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FlashcardsLearnPage;
