import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index"



function CardCreate() {
    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState([]);
    const initialCard = {
        front: "",
        back: "",
        deckId
    };
    //sets card as a blank object
    const [card, setCard] = useState({ ...initialCard });

    //changes the front of the flip card
    function frontChange(event) {
        setCard({ ...card, front: event.target.value })
    }

    //changes the back of the flip card
    function backChange(event) {
        setCard({ ...card, back: event.target.value })
    }

    //reads the deck with the specific deck Id and sets the deck state to the info.
    useEffect(() => {
        async function loadData() {
            const dataFromAPI = await readDeck(deckId);
            setDeck(dataFromAPI);
        }
        loadData();
    }, [deckId]);

    //submits the form and redirects to View Deck
    const handleSubmit = (event) => {
        event.preventDefault();
        async function updateData() {
            await createCard(deckId, card);
            setCard(initialCard);
            history.push(`/decks/${deckId}`)
        }
        updateData();
    };
    if (deck) {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item" key="1"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page" key="2">Add Card</li>
                    </ol>
                </nav>
                <br />
                <h2>{deck.name}: Add Card</h2>
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
            </div>
        );
    } else {
        return "Loading..."
    }
}
export default CardCreate;