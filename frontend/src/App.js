import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import FlashcardsPage from "./pages/FlashcardsPage";
import FlashcardsCreatePage from "./pages/FlashcardsCreatePage";
import axios from "axios";
import SettingsPage from "./pages/SettingsPage";
import Cookies from "js-cookie";
import AboutPage from "./pages/AboutPage";
import LessonsPage from "./pages/LessonsPage";
import ProfilePage from "./pages/ProfilePage";
import DeckDetailsPage from "./pages/DeckDetailsPage";
import FlashcardsLearnPage from "./pages/FlashcardsLearnPage";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
// axios.defaults.maxAge = 86400000;
axios.defaults.withCredentials = true;

export const UserContext = createContext();
export const ClientContext = createContext();

const client = axios.create({
  baseURL: "https://127.0.0.1:8000",
  withCredentials: true,
});

// const client = axios.create({
//   baseURL: `${process.env.REACT_APP_API_URL}`,
//   withCredentials: true,
// });

function App() {
  const [currentUser, setCurrentUser] = useState(false);
  const [user, setUser] = useState();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    client
      .get("/api/user", {
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      })
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });

    const fetchCurrentUser = async () => {
      try {
        const response = await client.get("/api/user", {
          mode: "cors",
          credentials: "include",
        });
        console.log("Response from /api/user:", response.data);
        setCurrentUser(response.data);
      } catch (error) {
        setCurrentUser(null);
      }
    };

    const fetchSettings = async () => {
      try {
        const response = await client.get("/api/settings", {
          mode: "cors",
          credentials: "include",
        });
        console.log("Response from /api/settings:", response.data);
        setSettings(response.data);
      } catch (error) {
        setSettings(null);
      }
    };
  }, []);

  // useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     try {
  //       const response = await client.get("/api/user", {
  //         mode: "cors",
  //         credentials: "include",
  //       });
  //       console.log("Response from /api/user:", response.data);
  //       setCurrentUser(response.data);
  //     } catch (error) {
  //       setCurrentUser(null);
  //     }
  //   };
  //   fetchCurrentUser();
  // });

  // useEffect(() => {
  //   const fetchSettings = async () => {
  //     try {
  //       const response = await client.get("/api/settings", {
  //         mode: "cors",
  //         credentials: "include",
  //       });
  //       console.log("Response from /api/settings:", response.data);
  //       setSettings(response.data);
  //     } catch (error) {
  //       setSettings(null);
  //     }
  //   }
  //   fetchSettings();
  // });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <ClientContext.Provider value={{ client }}>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={currentUser ? <Navigate to="/" /> : <LoginPage />}
            />
            <Route
              path="/register"
              element={currentUser ? <Navigate to="/" /> : <RegisterPage />}
            />
            <Route
              path="/"
              element={currentUser ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/flashcards"
              element={
                currentUser ? <FlashcardsPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/flashcards/create"
              element={
                currentUser ? (
                  <FlashcardsCreatePage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/settings"
              element={
                currentUser ? <SettingsPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/about"
              element={currentUser ? <AboutPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/lessons"
              element={currentUser ? <LessonsPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={currentUser ? <ProfilePage /> : <Navigate to="/login" />}
            />
            <Route
              path="flashcards/deck/:deckId"
              element={
                currentUser ? <DeckDetailsPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="flashcards/deck/:deckId/learn"
              element={
                currentUser ? <FlashcardsLearnPage /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </Router>
      </ClientContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
