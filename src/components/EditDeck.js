import React, { useEffect, useState } from "react";
import { readDeck, updateDeck } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";

export default function EditDeck() {
    const { deckId } = useParams();
    const [deckName, setDeckName] = useState("");
    const [deckDescription, setDeckDescription] = useState("");
    const history = useHistory();
    const newFormData = {
        "id": deckId,
        "name": deckName,
        "description": deckDescription
    }

    //calls the read deck function and sets the name of the deck to the deckName state, 
    //also sets the deck description to the deckDescription state
    useEffect(() => {
        const abortController = new AbortController();
        async function changeDeck() {
            let deckInfo = await readDeck(deckId, abortController.signal);
            setDeckName(deckInfo.name);
            setDeckDescription(deckInfo.description);
        }
        changeDeck();
        return () => {
            abortController.abort();
        };
    }, [deckId]);

    //changes the name of the deck
    const handleName = (event) => setDeckName(event.target.value);

    //changes the description of the deck
    const handleDescription = (event) => setDeckDescription(event.target.value);

    //submits the edited deck than redirects to view deck
    const handleSubmit = (event) => {
        event.preventDefault();
        updateDeck(newFormData)
            .then((result) => history.push(`/decks/${result.id}`));
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href={`/decks/${deckId}`}>{deckName}</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Deck
                    </li>
                </ol>
            </nav>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Deck Name:
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={deckName}
                        onChange={handleName}
                    />
                </label>
                <br />
                <label htmlFor="description">
                    Description:
                    <textarea
                        name="description"
                        id="description"
                        value={deckDescription}
                        onChange={handleDescription}
                    />
                </label>
                <br />
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => history.goBack(-1)}
                >
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}
