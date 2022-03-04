import React from "react";
import { useHistory } from "react-router-dom";

export default function CardLayout({ handleSubmit, card, frontChange, backChange, deckId }) {

    const history = useHistory();

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="front">
                Front
                <textarea
                    type="text"
                    name="front"
                    id="front"
                    value={card.front}
                    onChange={(event) => frontChange(event)}
                />
            </label>
            <br />
            <label htmlFor="back">
                Back
                <textarea
                    type="text"
                    name="back"
                    id="back"
                    value={card.back}
                    onChange={(event) => backChange(event)}
                />
            </label>
            <br />
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => history.push(`/decks/${deckId}`)}
            >
                Cancel
            </button>
            <button type="submit" className="btn btn-primary">
                Save
            </button>
        </form>
    )
}