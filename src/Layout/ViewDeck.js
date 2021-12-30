import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";

function ViewDeck({ currentDeck, chooseDeck }) {
  const { deckId } = useParams();
  const history = useHistory();
  const [cards, setCards] = useState([]);
  const [chosenCard, setChosenCard] = useState({});
  const [toDelete, setToDelete] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(false);

  useEffect(() => {
    async function loadSelectedDeck() {
      const response = await readDeck(deckId);
      setCards(response.cards);
      chooseDeck(response);
    }
    loadSelectedDeck();
  }, [deckId, chooseDeck]);

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

  useEffect(() => {
    if (cardToDelete) {
      async function deleteChosenCard() {
        const response = deleteCard(chosenCard.id);
        console.log(response);
      }
      if (
        window.confirm("Delete this card? You will not be able to recover it.")
      ) {
        deleteChosenCard();
        setCardToDelete(false);
      }
    }
  }, [cardToDelete, chosenCard.id]);

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {currentDeck.name}
          </li>
        </ol>
      </nav>
      <h3>{currentDeck.name}</h3>
      <p>{currentDeck.description}</p>
      <button type="button" onClick={() => history.push(`/decks/${currentDeck.id}/edit`)}>Edit</button>
      <button
        type="button"
        onClick={() => history.push(`/decks/${currentDeck.id}/study`)}
      >
        Study
      </button>
      <button type="button" onClick={() => history.push(`/decks/${currentDeck.id}/cards/new`)}>+ Add Cards</button>
      <button type="button" onClick={() => setToDelete(true)}>
        Delete
      </button>
      <h2>Cards</h2>
      <div>
        {cards.map((card, index) => (
          <div className="row" key={index}>
            <div className="col-3"></div>
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">{card.front}</p>
                  <p className="card-text">{card.back}</p>
                  <button type="button" onMouseEnter={() => setChosenCard(card)} onClick={() => history.push(`/decks/${currentDeck.id}/cards/${chosenCard.id}/edit`)}>Edit</button>
                  <button
                    type="button"
                    onMouseEnter={() => setChosenCard(card)}
                    onClick={() => setCardToDelete(true)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="col-3"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewDeck;
