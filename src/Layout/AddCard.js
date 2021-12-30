import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";

function AddCard({ currentDeck, chooseDeck }) {
  const { url } = useRouteMatch();
  const { deckId } = useParams();
  const history = useHistory();

  const initialFormState = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    async function loadSelectedDeck() {
      const response = await readDeck(deckId);
      chooseDeck(response);
    }
    loadSelectedDeck();
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, formData);
    setFormData(initialFormState);
  };

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
            Add Card
          </li>
        </ol>
      </nav>
      <h2>{`${currentDeck.name}: Add Card`}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            rows="3"
            name="front"
            className="form-control"
            placeholder="Front side of card"
            onChange={handleChange}
            value={formData.front}
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            rows="3"
            name="back"
            className="form-control"
            placeholder="Back side of card"
            onChange={handleChange}
            value={formData.back}
          />
        </div>
        <button type="button" onClick={() => history.push(`/decks/${deckId}`)}>
          Done
        </button>
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default AddCard;
