// FlashcardsCreatePage.js
import React, { useState, useRef, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Container, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import logo from "../images/logo1.png";
import "../App.css";
import "../Global.css";
import "../Flashcard.css";
import Header from "../components/Header";
import Footer from '../components/Footer';
import NewFlashcard from "../components/NewFlashcard";
import { UserContext } from "../App.js";
import { ClientContext } from "../App.js";
import Cookies from "js-cookie";
// import CSRFToken from "../components/CSRFToken.js";

const FlashcardsCreatePage = () => {
  const [setName, setSetName] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const flashcardsContRef = useRef(null);
  const { setCurrentUser } = useContext(UserContext);
  const { client } = useContext(ClientContext);
  const [user, setUser] = useState();

  //   function getcookie(name) {
  //     var cookievalue = null;
  //     if (document.cookie && document.cookie !== '') {
  //         var cookies = document.cookie.split(';');
  //         for (var i = 0; i < cookies.length; i++) {
  //             var cookie = jquery.trim(cookies[i]);
  //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
  //                 cookievalue = decodeuricomponent(cookie.substring(name.length + 1));
  //                 break;
  //             }
  //         }
  //     }
  //     return cookievalue;
  // }

  // var csrftoken = getcookie('csrftoken');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await client.get("/api/user", {
          mode: "cors",
          credentials: "include",
        });
        console.log("Response from /api/user:", response.data);
        setUser(response.data);
        setCurrentUser(response.data); // Ustaw aktualnego użytkownika w kontekście
      } catch (error) {
        setUser(null); // Ustaw null, aby oznaczyć, że nie ma zalogowanego użytkownika
      }
    };

    // Wywołaj funkcję fetchCurrentUser przy montażu komponentu
    fetchCurrentUser();
  }, [client, setCurrentUser]);

  const handleAddFlashcard = (flashcard) => {
    setFlashcards([...flashcards, flashcard]);
  };

  const addNewFlashcard = () => {
    // Dodaj nowy komponent NewFlashcard przed przyciskiem "Add Flashcard"
    setFlashcards((prevFlashcards) => [
      ...prevFlashcards,
      { id: Date.now() }, // Dodaj unikalne ID dla nowego komponentu (opcjonalne)
    ]);
  };

  // const saveChanges = async () => {
  //   try {
  //     // Utwórz deck i dodaj flashcards

  //     const response = await client.post('/api/flashcards/create/', {
  //       deck: {
  //         name: setName,
  //       },
  //       flashcards: flashcards,
  //     },
  //     {
  //       mode: 'cors',
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'X-CSRFToken': Cookies.get('csrftoken'),
  //       }
  //     })
  //     .then(function (res) {
  //       console.log("Response headers:", res.headers);
  //     });
  //     console.log('Deck and flashcards created successfully!', response.data);
  //   } catch (error) {
  //     console.error('Error creating deck and flashcards:', error);
  //   }
  // };

  // const saveDeck = (e) => {
  //   e.preventDefault();

  //   client.post(
  //     "api/flashcards/create", {
  //       deck: {
  //         name: setName,
  //       },
  //       flashcards: flashcards,
  //     },
  //     {
  //       mode: 'cors',
  //       credentials: 'include'
  //     })
  //     .then(function (res) {
  //       console.log("Response headers:", res.headers);
  //     });
  // };

  const saveDeck = async (e) => {
    e.preventDefault();
    client
      .post(
        "api/deck_create",
        {
          // user: user.user.user_id,
          user: 3,
          name: setName,
        },
        {
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            // "X-CSRFToken": Cookies.get("csrftoken"),
          },
        }
      )
      .then(function (res) {
        console.log("Response headers:", res.headers);
      });
  };

  useEffect(() => {
    // Automatyczne przewijanie do ostatniego elementu po dodaniu nowego pola fiszek
    if (flashcardsContRef.current) {
      flashcardsContRef.current.scrollTop =
        flashcardsContRef.current.scrollHeight;
    }
  }, [flashcards]);

  return (
    <div>
      <Header client={client} setCurrentUser={setCurrentUser}></Header>
      <div
        className="container-md bg-dark bg-card center flex-column"
        style={{ maxHeight: "70vh" }}
      >
        {/* <h2>This is flashcard Create page</h2> */}

        {/* Pole do wprowadzania nazwy zestawu */}
        <Form onSubmit={saveDeck}>
          <Form.Group className="mb-3" controlId="formSetName">
            <Form.Label style={{ fontSize: "20px" }}>Set Deck Name</Form.Label>
            <Form.Control
              type="text"
              // placeholder=""
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
            />
          </Form.Group>
          {/* <Button
            type="submit"
            // onClick={saveDeck}
            className="btn btn-warning btn-rounded"
            data-mdb-ripple-color="#ffffff"
            style={{ backgroundColor: "#f19c51", border: "none" }}
          >
            Save Deck
          </Button> */}
        </Form>

        <div className="flashcards-cont mb-3" ref={flashcardsContRef}>
          <NewFlashcard></NewFlashcard>
          {/* Komponenty NewFlashcard */}
          {flashcards.map((flashcard, index) => (
            <NewFlashcard key={index} onAddFlashcard={handleAddFlashcard} />
          ))}
        </div>

        {/* Przycisk do dodawania nowych fiszek */}
        <Button
          type="button"
          id="add-flashcard-btn"
          onClick={addNewFlashcard}
          className="btn btn-warning btn-rounded mb-3"
          data-mdb-ripple-color="#ffffff"
          style={{ backgroundColor: "#f19c51", border: "none" }}
        >
          Add New Flashcard
        </Button>

        {/* Przycisk do zapisywania zmian */}
        <Button
          type="submit"
          // onClick={saveDeck}
          className="btn btn-warning btn-rounded"
          data-mdb-ripple-color="#ffffff"
          style={{ backgroundColor: "#f19c51", border: "none" }}
        >
          Save Deck
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default FlashcardsCreatePage;
