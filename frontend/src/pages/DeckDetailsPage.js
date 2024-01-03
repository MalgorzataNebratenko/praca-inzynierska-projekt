// DeckDetailsPage.js
import React, { useEffect, useState, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { ClientContext } from "../App.js";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FlashcardExcersise from "../components/FlashcardExcersise.js";
import { Button } from "react-bootstrap";

const DeckDetailsPage = () => {
  const { deckId } = useParams();
  const [deckDetails, setDeckDetails] = useState(null);
  const { client } = useContext(ClientContext);

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
  }, [deckId]);

  if (!deckDetails) {
    return <p>Loading...</p>;
  }

  return (
    // <div>
    //   <h2>{deckDetails.name}</h2>
    //   {/* Wyświetl inne informacje o zestawie, np. fiszki, statystyki itp. */}
    // </div>
    <div>
      <Header></Header>
      <div className="container-lg bg-dark bg-card">
        <div
          className="center"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h2>{deckDetails.name}</h2>
          <div style={{ display: "flex", flexDirection: "row", gap: "30px", marginTop: "20px" }}>
            <Button
                type="button"
                as={NavLink}
                to={`/flashcards/deck/${deckId}/learn`}
                className="btn btn-warning btn-rounded"
                data-mdb-ripple-color="#ffffff"
                style={{ backgroundColor: "#f19c51", border: "none", minWidth: "150px" }}
            >
                Ucz się
            </Button>
            <Button
                type="button"
                as={NavLink}
                to={`/flashcards/deck/${deckId}/edit`}
                className="btn btn-warning btn-rounded"
                data-mdb-ripple-color="#ffffff"
                style={{ backgroundColor: "#f19c51", border: "none", minWidth: "150px"  }}
            >
                Edytuj zestaw
            </Button>
          </div>
          {/* <FlashcardExcersise deckId={deckId}></FlashcardExcersise> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DeckDetailsPage;
