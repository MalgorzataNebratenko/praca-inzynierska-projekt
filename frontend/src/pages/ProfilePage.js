import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Calendar from "react-calendar";
import axios from "axios";
import "../App.css";
import "../Global.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "react-calendar/dist/Calendar.css";
import { ClientContext } from "../App.js";
import FlagIcon from "../FlagIcon";
import userIcon from "../images/user-icon.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const ProfilePage = () => {
  const [loginDates, setLoginDates] = useState([]);
  const { client } = useContext(ClientContext);
  const [user, setUser] = useState(null);
  const [streak, setStreak] = useState(null);

  useEffect(() => {
    // Pobierz daty zalogowań z API po załadowaniu komponentu
    const fetchData = async () => {
      try {
        const response = await client.get("/api/login_history/");
        setLoginDates(response.data.map((login) => new Date(login.login_date)));
      } catch (error) {
        console.error("Error fetching login dates:", error);
      }
    };

    fetchData();
  }, [client]);

  useEffect(() => {
    // Pobierz aktualnego użytkownika po załadowaniu komponentu
    const fetchCurrentUser = async () => {
      try {
        const response = await client.get("/api/user");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, [client]);

  useEffect(() => {
    // Pobierz aktualną serię logowań po załadowaniu komponentu
    const fetchLoginStreak = async () => {
      try {
        const response = await client.get("/api/user_streak/");
        setStreak(response.data.consecutive_days);
      } catch (error) {
        console.error("Error fetching login streak:", error);
      }
    };

    fetchLoginStreak();
  }, [client]);

  const tileContent = ({ date, view }) =>
    view === "month" &&
    loginDates.some(
      (loginDate) => loginDate.toDateString() === date.toDateString()
    ) ? (
      <div
        style={{
          backgroundColor: "green",
          borderRadius: "50%",
          height: "8px",
          width: "8px",
        }}
      />
    ) : null;

  return (
    <div>
      <Header />
      <div className="container-lg bg-dark bg-card p-5">
        <div
          className="center"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h2>It's Profile Page</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {/* Logo użytkownika */}
            <img src={userIcon} style={{ marginRight: "3px" }} />

            {/* Nazwa użytkownika */}
            {user && user.user && (
              <div>
                <h2>{user.user.username}</h2>
              </div>
            )}
            {/* <OverlayTrigger
              key="top"
              placement="top"
              overlay={
                <Tooltip id={`tooltip-top`}>
                  {user.nationality.display_name}
                </Tooltip>
              }
            > */}
              {/* Narodowość */}
              {user && user.user.nationality && (
                <div>
                  <FlagIcon code={user.user.nationality} />
                </div>
              )}
            {/* </OverlayTrigger> */}
            {/* Aktualna seria logowań */}
            {streak !== null && (
              <div>
                Aktualna seria: {streak} 
              </div>
            )}
          </div>
        
          <div style={{ width: "300px", marginTop: "10px" }}>
            <Calendar tileContent={tileContent} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
