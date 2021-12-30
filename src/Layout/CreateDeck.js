import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

// TODO add functionality to form buttons and create submithandler (possibly do that in Layout)

function CreateDeck() {
  const history = useHistory();

  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createDeck(formData);
    history.push(`/decks/${response.id}`);
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            className="form-control"
            type="text"
            placeholder="Deck Name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            rows="3"
            name="description"
            className="form-control"
            placeholder="Brief description of the deck"
            onChange={handleChange}
            value={formData.description}
          />
        </div>
        <button type="button" onClick={() => history.push("/")}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CreateDeck;
