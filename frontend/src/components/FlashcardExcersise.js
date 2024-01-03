import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ClientContext } from "../App.js";
import arrowLeft from "../images/arrow-left.png";
import arrowRight from "../images/arrow-right.png";

const FlashcardExcersise = ({ deckId }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { client } = useContext(ClientContext);
  const [isFlipped, setFlipped] = useState(false);

  const sampleFlashcards = [
    {
      card_id: 1,
      deck: 1,
      front: "Kot",
      back: "Cat",
      viewed: 0,
      correct_answers: 0,
      wrong_answers: 0,
      created_at: "2023-01-01T12:00:00Z",
    },
    {
      card_id: 2,
      deck: 1,
      front: "Dom",
      back: "House",
      viewed: 0,
      correct_answers: 0,
      wrong_answers: 0,
      created_at: "2023-01-02T12:00:00Z",
    },
    {
      card_id: 3,
      deck: 1,
      front: "Samochód",
      back: "Car",
      viewed: 0,
      correct_answers: 0,
      wrong_answers: 0,
      created_at: "2023-01-03T12:00:00Z",
    },
    {
      card_id: 4,
      deck: 1,
      front: "Książka",
      back: "Book",
      viewed: 0,
      correct_answers: 0,
      wrong_answers: 0,
      created_at: "2023-01-04T12:00:00Z",
    },
  ];

  //   useEffect(() => {
  //     // Pobierz fiszki dla danego decku z backendu
  //     client.get(`/api/deck/${deckId}/flashcards/`)
  //       .then(response => {
  //         setFlashcards(response.data);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching flashcards:', error);
  //       });
  //   }, [deckId]);

  useEffect(() => {
    setFlipped(false); // Ustaw isFlipped na false za każdym razem, gdy zmienia się currentIndex
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sampleFlashcards.length);
    setFlipped(false);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + sampleFlashcards.length) % sampleFlashcards.length
    );
  };

  const handleFlip = () => {
    setFlipped(!isFlipped);
  };

  const handleKnow = () => {
    // Implementuj logikę dla "Umiem"
  };

  const handleNotKnow = () => {
    // Implementuj logikę dla "Nie umiem"
  };

  const currentFlashcard = sampleFlashcards[currentIndex];

  return (
    <div className="flashcard-review-containter">
      <div
        className={`flip-card${isFlipped ? " flipped" : ""}`}
        onClick={handleFlip}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front" onClick={handleFlip}>
            {/* Wyświetl treść frontową */}
            <p>{currentFlashcard.front}</p>
            {/* <p>{sampleFlashcards[currentIndex]}</p> */}
          </div>
          <div className="flip-card-back" onClick={handleFlip}>
            {/* Wyświetl treść tyłową */}
            <p>{currentFlashcard.back}</p>
            {/* <p>{flashcards[currentIndex] + 1}</p> */}
          </div>
        </div>
      </div>

      <div className="controls">
        <button onClick={handlePrev} style={{ border: "none" }}>
          <img
            src={arrowLeft}
            height="35"
            className="d-inline-block align-top"
            alt="Linguastine Logo"
          />
        </button>
        <button
          onClick={handleKnow}
          className="btn btn-warning btn-rounded shadow"
          data-mdb-ripple-color="#ffffff"
          style={{ backgroundColor: "#A8DF8E", border: "none", minWidth:"120px" }}
        >
          Umiem
        </button>
        <button
          onClick={handleNotKnow}
          className="btn btn-warning btn-rounded shadow"
          data-mdb-ripple-color="#ffffff"
          style={{ backgroundColor: "#E25E3E", border: "none", minWidth:"120px" }}
        >
          Nie umiem
        </button>
        <button onClick={handleNext}>
          <img
            src={arrowRight}
            height="35"
            className="d-inline-block align-top"
            alt="Linguastine Logo"
          />
        </button>
      </div>
    </div>
  );
};

export default FlashcardExcersise;
