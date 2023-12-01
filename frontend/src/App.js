import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.maxAge = 86400000;
axios.defaults.withCredentials = true;


const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true
});

function App() {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    client.get("/api/user",
    {
      mode: 'cors',
      credentials: 'include'
    })
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/" /> : <LoginPage client={client} setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/register"
          element={currentUser ? <Navigate to="/" /> : <RegisterPage client={client} setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/"
          element={currentUser ? <HomePage client={client} setCurrentUser={setCurrentUser} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;