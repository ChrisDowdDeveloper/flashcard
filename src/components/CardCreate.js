import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index"
import CardLayout from "./CardLayout";



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

    //reads the deck with the specific deck Id and sets the deck state to the info.
    useEffect(() => {
        const ac = new AbortController();
        async function loadData() {
            const dataFromAPI = await readDeck(deckId, ac.signal);
            setDeck(dataFromAPI);
        }
        loadData();
        return () => ac.abort();
    }, [deckId]);


    //changes the front of the flip card
    function frontChange(event) {
        setCard({ ...card, front: event.target.value })
    }

    //changes the back of the flip card
    function backChange(event) {
        setCard({ ...card, back: event.target.value })
    }

    //submits the form and redirects to View Deck
    function handleSubmit(event) {
        event.preventDefault()
        createCard(deckId, card)
        setCard(initialCard)
        history.push(`/decks/${deckId}`)
    }
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
                <CardLayout
                    frontChange={frontChange}
                    backChange={backChange}
                    handleSubmit={handleSubmit}
                    card={card}
                    deckId={deckId}
                />
            </div>
        );
    } else {
        return "Loading..."
    }
}
export default CardCreate;