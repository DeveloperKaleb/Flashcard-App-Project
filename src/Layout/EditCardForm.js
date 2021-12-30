import React from "react";
import { useHistory } from "react-router-dom"
import { updateCard } from "../utils/api/index";


function EditCardForm({ setFormData, formData, initialFormState, deckId }) {
    const history = useHistory();

    const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        await updateCard(formData);
        setFormData(initialFormState);
      };

    return (
    
    <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            rows="3"
            name="front"
            className="form-control"
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
            onChange={handleChange}
            value={formData.back}
          />
        </div>
        <button type="button" onClick={() => history.push(`/decks/${deckId}`)}>
          Done
        </button>
        <button type="submit">Save</button>
      </form>
      )
}

export default EditCardForm;