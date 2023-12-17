import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import FlashcardsPage from './pages/FlashcardsPage';
import FlashcardsCreatePage from './pages/FlashcardsCreatePage';
import axios from 'axios';
import SettingsPage from './pages/SettingsPage';
import Cookies from 'js-cookie';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.maxAge = 86400000;
axios.defaults.withCredentials = true;

export const UserContext = createContext()
export const ClientContext = createContext();

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
});

// const client = axios.create({
//   baseURL: `${process.env.REACT_APP_API_URL}`,
//   withCredentials: true,
// });

function App() {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    client.get("/api/user",
    {
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      }
    },
    )
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
    <ClientContext.Provider value={{ client}}>
    <Router>
      <Routes>
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/" /> : <LoginPage/>}
        />
        <Route
          path="/register"
          element={currentUser ? <Navigate to="/" /> : <RegisterPage/>}
        />
        <Route
          path="/"
          element={currentUser ? <HomePage/> : <Navigate to="/login" />}
        />
        <Route
          path="/flashcards"
          element={currentUser ? <FlashcardsPage/> : <Navigate to="/login" />}
        />
        <Route
          path="/flashcards/create"
          element={currentUser ? <FlashcardsCreatePage/> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          // element={currentUser ? <SettingsPage/> : <Navigate to="/login" />}
          element= {<SettingsPage/>}
        />
      </Routes>
    </Router>
    </ClientContext.Provider>
    </UserContext.Provider>
  );
}

export default App;