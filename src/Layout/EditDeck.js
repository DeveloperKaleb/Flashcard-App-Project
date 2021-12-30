import React, { useEffect, useState } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api/index";

import EditDeckForm from "./EditDeckForm";

function EditDeck({ currentDeck, chooseDeck }) {
  const { url } = useRouteMatch();
  const { deckId } = useParams();

  


  useEffect(() => {
    async function loadSelectedDeck() {
      const response = await readDeck(deckId);
      chooseDeck(response);
      setFormData({
        id: deckId,
        name: response.name,
        description: response.description,
      })
    }
    loadSelectedDeck();
  }, [deckId, chooseDeck]);

  const initialFormState = {};

  const [formData, setFormData] = useState(initialFormState);

  if (formData.name)  {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={url}>{currentDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
      {formData.name ? <EditDeckForm setFormData={setFormData} initialFormState={initialFormState} deckId={deckId} formData={formData} /> : <>Loading..</> }
    </>
  );
  }
  return <>Loading..</>
}

export default EditDeck;
