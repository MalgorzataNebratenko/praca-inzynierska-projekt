import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ClientContext } from "../App.js";
import arrowLeft from "../images/arrow-left.png";
import arrowRight from "../images/arrow-right.png";
import randomOff from "../images/random-off.png";
import randomOn from "../images/random-on.png";
import swapOff from "../images/swap-off.png";
import swapOn from "../images/swap-on.png";

const FlashcardExcersise = ({ deckId }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { client } = useContext(ClientContext);
  const [isFlipped, setFlipped] = useState(false);
  const [isSwapped, setSwapped] = useState(false);
  const [isRandom, setRandom] = useState(false);
  const [hasShuffled, setHasShuffled] = useState(false);

  useEffect(() => {
    // Pobierz fiszki dla danego decku z backendu
    client
      .get(`/api/deck/${deckId}/flashcards/`)
      .then((response) => {
        setFlashcards(response.data);
        console.log("Pobrane fiszki:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching flashcards:", error);
      });
  }, [deckId]);

  useEffect(() => {
    setFlipped(false);
  }, [currentIndex]);

  useEffect(() => {
    // Jeżeli opcja random jest włączona i jeszcze nie przemieszaliśmy, przemieszaj fiszki
    if (isRandom && !hasShuffled) {
      const shuffledFlashcards = [...flashcards];
      for (let i = shuffledFlashcards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledFlashcards[i], shuffledFlashcards[j]] = [shuffledFlashcards[j], shuffledFlashcards[i]];
      }
      setFlashcards(shuffledFlashcards);
      setHasShuffled(true);
    }
  }, [isRandom, currentIndex, hasShuffled]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setFlipped(false);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
  };

  const handleFlip = () => {
    setFlipped(!isFlipped);
  };

  const handleSwap = () => {
    setSwapped(!isSwapped);
  };

  const handleKnow = () => {
    // Implementuj logikę dla "Umiem"
  };

  const handleNotKnow = () => {
    // Implementuj logikę dla "Nie umiem"
  };

  const handleRandom = () => {
    setRandom(!isRandom);
    // Jeżeli zmieniamy na random, zresetuj hasShuffled
    if (!isRandom) {
      setHasShuffled(false);
    }
  };

  const currentFlashcard = flashcards[currentIndex];
  const frontContent = currentFlashcard ? (isSwapped ? currentFlashcard.back : currentFlashcard.front) : "";
  const backContent = currentFlashcard ? (isSwapped ? currentFlashcard.front : currentFlashcard.back) : "";

  return (
    <div className="flashcard-review-containter">
      {flashcards.length > 0 ? (
        <div
          className={`flip-card${isFlipped ? " flipped" : ""}`}
          onClick={handleFlip}
        >
          <div className="flip-card-inner">
            <div className="flip-card-front" onClick={handleFlip}>
              <p>{frontContent}</p>
            </div>
            <div className="flip-card-back" onClick={handleFlip}>
              <p>{backContent}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Brak fiszek w zestawie.</p>
      )}
      {flashcards.length > 0 && (
        <div className="controls">
          <span style={{ marginTop: "10px" }}>
            {`Fiszka ${currentIndex + 1} z ${flashcards.length}`}
          </span>
          <button onClick={handleSwap}>
            <img
              src={isSwapped ? swapOn : swapOff}
              height="35"
              className="d-inline-block align-top"
              alt="Swap Icon"
            />
          </button>
          <button onClick={handleRandom}>
            <img
              src={isRandom ? randomOn : randomOff}
              height="35"
              className="d-inline-block align-top"
              alt="Random Icon"
            />
          </button>
        </div>
      )}

      {flashcards.length > 0 && (
        <div className="controls">
          <button onClick={handlePrev} disabled={currentIndex === 0}>
            <img
              src={arrowLeft}
              height="35"
              className="d-inline-block align-top"
              alt="Left Arrow"
            />
          </button>
          <button
            onClick={handleKnow}
            className="btn btn-warning btn-rounded shadow"
            data-mdb-ripple-color="#ffffff"
            style={{
              backgroundColor: "#A8DF8E",
              border: "none",
              minWidth: "120px",
            }}
          >
            Umiem
          </button>
          <button
            onClick={handleNotKnow}
            className="btn btn-warning btn-rounded shadow"
            data-mdb-ripple-color="#ffffff"
            style={{
              backgroundColor: "#E25E3E",
              border: "none",
              minWidth: "120px",
            }}
          >
            Wciąż się uczę
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
          >
            <img
              src={arrowRight}
              height="35"
              className="d-inline-block align-top"
              alt="Right Arrow"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default FlashcardExcersise;