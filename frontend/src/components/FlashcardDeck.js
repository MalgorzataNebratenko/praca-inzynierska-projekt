// components/FlashcardDeck.js
import React from "react";
import { NavLink} from "react-router-dom";

const FlashcardDeck = ({ deck }) => {
  return (
    <div className="container-md bg-light bg-card-wht">
      <NavLink className="nav-link" to={`/flashcards/deck/${deck.deck_id}`}>
        <h5>{deck.name}</h5>
      </NavLink>
      {/* Dodaj tutaj dowolne inne elementy do przedstawienia */}
    </div>
  );
};

export default FlashcardDeck;