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
  const [flashcards, setFlashcards] = useState([]);
  const { client } = useContext(ClientContext);

  //do testowania
  // const sampleFlashcards = [
  //   {
  //     card_id: 1,
  //     deck: 1,
  //     front: "Kot",
  //     back: "Cat",
  //     viewed: 0,
  //     correct_answers: 0,
  //     wrong_answers: 0,
  //     created_at: "2023-01-01T12:00:00Z",
  //   },
  //   {
  //     card_id: 2,
  //     deck: 1,
  //     front: "Dom",
  //     back: "House",
  //     viewed: 0,
  //     correct_answers: 0,
  //     wrong_answers: 0,
  //     created_at: "2023-01-02T12:00:00Z",
  //   },
  //   {
  //     card_id: 3,
  //     deck: 1,
  //     front: "Samochód",
  //     back: "Car",
  //     viewed: 0,
  //     correct_answers: 0,
  //     wrong_answers: 0,
  //     created_at: "2023-01-03T12:00:00Z",
  //   },
  //   {
  //     card_id: 4,
  //     deck: 1,
  //     front: "Książka",
  //     back: "Book",
  //     viewed: 0,
  //     correct_answers: 0,
  //     wrong_answers: 0,
  //     created_at: "2023-01-04T12:00:00Z",
  //   },
  //   {
  //     card_id: 5,
  //     deck: 1,
  //     front: "Kot",
  //     back: "Cat",
  //     viewed: 0,
  //     correct_answers: 0,
  //     wrong_answers: 0,
  //     created_at: "2023-01-01T12:00:00Z",
  //   },
  //   {
  //     card_id: 6,
  //     deck: 1,
  //     front: "Dom",
  //     back: "House",
  //     viewed: 0,
  //     correct_answers: 0,
  //     wrong_answers: 0,
  //     created_at: "2023-01-02T12:00:00Z",
  //   },
  //   {
  //     card_id: 7,
  //     deck: 1,
  //     front: "Samochód",
  //     back: "Car",
  //     viewed: 0,
  //     correct_answers: 0,
  //     wrong_answers: 0,
  //     created_at: "2023-01-03T12:00:00Z",
  //   },
  //   {
  //     card_id: 8,
  //     deck: 1,
  //     front: "Książka",
  //     back: "Book",
  //     viewed: 0,
  //     correct_answers: 0,
  //     wrong_answers: 0,
  //     created_at: "2023-01-04T12:00:00Z",
  //   },
  // ];

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
        console.log("Pobrane fiszki:", response.data);
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
      <Header />
      <div
        className="container-lg bg-dark bg-card"
        style={{ maxHeight: "70vh" }}
      >
        <div
          className="center"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h2>{deckDetails.name}</h2>
          <p>{`Liczba fiszek: ${flashcards.length}`}</p>

          {flashcards.length > 0 ? (
            <div style={{ maxHeight: "60%" }}>
              <h5>Lista fiszek:</h5>
              <div className="flashcards-cont">
                {flashcards.map((flashcard, index) => (
                  <div key={index} className="flashcard-style">
                    <div style={{ width: "45%", paddingLeft: "15px" }}>
                      {flashcard.front}
                    </div>
                    <div className="separator-style"></div>
                    <div style={{ width: "55%", paddingLeft: "15px" }}>
                      {flashcard.back}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h5>Lista fiszek:</h5>
              <p>Brak dostępnych fiszek. Dodaj nowe fiszki do zestawu.</p>
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "30px",
              marginTop: "20px",
            }}
          >
            <Button
              type="button"
              as={NavLink}
              to={`/flashcards/deck/${deckId}/learn`}
              className="btn btn-warning btn-rounded"
              data-mdb-ripple-color="#ffffff"
              style={{
                backgroundColor: "#f19c51",
                border: "none",
                minWidth: "150px",
              }}
            >
              Ucz się
            </Button>
            <Button
              type="button"
              as={NavLink}
              to={`/flashcards/deck/${deckId}/edit`}
              className="btn btn-warning btn-rounded"
              data-mdb-ripple-color="#ffffff"
              style={{
                backgroundColor: "#f19c51",
                border: "none",
                minWidth: "150px",
              }}
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
