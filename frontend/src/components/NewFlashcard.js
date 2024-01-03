// NewFlashcard.js
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import deleteIcon from "../images/delete.png";

const NewFlashcard = ({ onAddFlashcard }) => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const handleAddFlashcard = () => {
    // Sprawdzenie, czy front i back nie są puste
    if (front.trim() !== "" && back.trim() !== "") {
      onAddFlashcard({ front, back });
      setFront("");
      setBack("");
    }
  };

  return (
    <div className="mb-3" style={{ display: "flex" }}>
      <Form.Control
        className="ml-1"
        type="text"
        placeholder="Enter front text"
        value={front}
        onChange={(e) => setFront(e.target.value)}
        style={{ marginRight: "5px", marginLeft: "10px" }}
      />
      <Form.Control
        className="ml-1"
        type="text"
        placeholder="Enter back text"
        value={back}
        onChange={(e) => setBack(e.target.value)}
        style={{ marginLeft: "5px" }}
      />
      <Button
        type="button"
        style={{
          backgroundColor: "transparent",
          border: "none",
          height: "auto",
          padding: 0, // Dodaj padding 0
          marginLeft: "5px",
        }}
        onClick={handleAddFlashcard}
      >
        <img
          src={deleteIcon}
          style={{ height: "38px", width: "auto", display: "block" }} // Dodaj display: 'block'
          alt="Delete button"
        />
      </Button>
    </div>
  );
};

export default NewFlashcard;
