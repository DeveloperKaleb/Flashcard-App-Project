import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";
import NotFound from "./NotFound";

function DeckDisplay({ currentDeck, chooseDeck, decks }) {
  const history = useHistory();
  const [toDelete, setToDelete] = useState(false);
  

  useEffect(() => {
    if (toDelete) {
      async function deleteChosenDeck() {
        const response = deleteDeck(currentDeck.id);
        console.log(response);
      }
      if (
        window.confirm("Delete this deck? You will not be able to recover it.")
      ) {
        deleteChosenDeck();
        setToDelete(false);
      }
    }
  }, [toDelete, currentDeck.id]);

  if (decks.length) {
    const deckList = decks.map((deck, index) => {
      return (
        <div className="row" key={index}>
          <div className="col-3"></div>
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{deck.name}</h2>
                <h6>{`${deck.cards.length} cards`}</h6>
                <p className="card-text">{deck.description}</p>
                <button
                  type="button"
                  onMouseEnter={() => chooseDeck(deck)}
                  onClick={() => history.push(`/decks/${deck.id}`)}
                >
                  View
                </button>
                <button
                  type="button"
                  onMouseEnter={() => chooseDeck(deck)}
                  onClick={() => history.push(`/decks/${deck.id}/study`)}
                >
                  Study
                </button>
                <button
                  type="button"
                  onMouseEnter={() => chooseDeck(deck)}
                  onClick={() => setToDelete(true)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      );
    });
    return (
      <>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-2">
            <button onClick={() => history.push("/decks/new")}>
              + Create Deck
            </button>
          </div>
        </div>
        {deckList}
      </>
    );
  }
  return <NotFound />;
}

export default DeckDisplay;
