import React from "react";
import { useHistory } from "react-router-dom";
import { updateDeck } from "../utils/api/index";

function EditDeckForm({ setFormData, initialFormState, formData, deckId }) {
    const history = useHistory();
    
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck(formData);
    setFormData({initialFormState})
  };

    return (
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            className="form-control"
            type="text"
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
            onChange={handleChange}
            value={formData.description}
          />
        </div>
        <button type="button" onClick={() => history.push(`/decks/${deckId}`)}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </form>
    )
}

export default EditDeckForm;