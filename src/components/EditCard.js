import { readCard, updateCard, readDeck } from "../utils/api";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function EditCard() {
    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
    const history = useHistory();

    //Calls the function to get the deck and the card and places them in the deck and card state
    useEffect(() => {
        const ac = new AbortController();
        async function loadTheCard() {
            const loadedCard = await readCard(cardId, ac.signal);
            setCard(loadedCard);
        }
        async function readTheDeck() {
            const deckIsRead = await readDeck(deckId, ac.signal);
            setDeck(deckIsRead);
        }
        readTheDeck();
        loadTheCard();
        return () => ac.abort();
    }, [cardId, deckId]);

    //Changes front of card
    function frontChange(event) {
        setCard({ ...card, front: event.target.value })
    }
    //Changes back of card
    function backChange(event) {
        setCard({ ...card, back: event.target.value })
    }
    //Submits data than takes back to View Deck 
    function handleSubmit(event) {
        event.preventDefault();
        updateCard(card)
            .then((result) => {
                history.push(`/decks/${deckId}`);
            });
    }


    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href={`/decks/${deckId}`}>{deck.name}</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Card {card.id}
                    </li>
                </ol>
            </nav>
            <h2>Edit Card </h2>
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
}