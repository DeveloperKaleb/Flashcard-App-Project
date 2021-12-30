import React, { useEffect, useState } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api/index";

import EditCardForm from "./EditCardForm"

function EditCard({ currentDeck, chooseDeck }) {
  const { deckId, cardId } = useParams();
  const { url } = useRouteMatch();


  useEffect(() => {
    async function loadSelectedDeck() {
      const response = await readDeck(deckId);
      chooseDeck(response);
      const foundCard = response.cards.find(card => `${card.id}` === cardId)
      setFormData({
        id: cardId,
        front: foundCard.front,
        back: foundCard.back,
        deckId: deckId,
      })
    }
    loadSelectedDeck();
  }, [deckId, cardId, chooseDeck]);

  const initialFormState = {}

  const [formData, setFormData] = useState(initialFormState);

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={url}>Deck {currentDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      {formData.front ? <EditCardForm setFormData={setFormData} formData={formData} initialFormState={initialFormState} deckId={deckId} /> : <>Loading..</>}
    </>
  );
  }

export default EditCard;
