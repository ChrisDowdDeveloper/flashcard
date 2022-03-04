import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { deleteCard, readDeck, deleteDeck } from "../utils/api";



export default function View() {
    const { deckId } = useParams();
    const [decks, setDecks] = useState({});
    const [cards, setCards] = useState([])
    const history = useHistory();


    //calls readDeck function and sets the info into the decks state and the cards state
    useEffect(() => {
        const ac = new AbortController()
        async function getDeckInfo() {
            const response = await readDeck(deckId, ac.signal)
            setDecks(response);
            setCards(response.cards)
        }
        getDeckInfo();
        return () => ac.abort()
    }, [deckId]);

    //handles the delete of the deck
    async function handleDelete(deckId) {
        const confirm = window.confirm("Delete this deck? You will not be able to recover it.")
        if (confirm) {
            await deleteDeck(deckId);
            history.push("/");
        }
    }

    //handles the delete of the card
    const cardDelete = async (id) => {
        const question = window.confirm("Would you like to delete this card?");
        if (question) {
            await deleteCard(id);
            history.go(0);
            history.push("/");
        }
    }


    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {decks.name}
                    </li>
                </ol>
            </nav>
            <div className="list-group-item">
                <h3>{decks.name}</h3>
                <p>{decks.description}</p>
                <div className="row">
                    <div className="col-auto mr-auto">
                        <Link to={`/decks/${deckId}/edit`}><button>Edit</button></Link>
                        <Link to={`/decks/${deckId}/study`}><button>Study</button></Link>
                        <Link to={`/decks/${deckId}/cards/new`}><button>Add Card</button></Link>
                    </div>
                    <div className="col-auto">
                        <button onClick={() => handleDelete(deckId)}>Delete</button>
                    </div>
                </div>
            </div>

            <h1>Cards</h1>
            <div className="card">
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        {cards.map(card => (
                            <li key={card.id}>
                                <div className="list-group-item">
                                    <div className="row">
                                        <div className="col-auto mr-auto">
                                            <p>{card.front}</p>
                                        </div>
                                        <div className="col-auto">
                                            <p>{card.back}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-auto">
                                            <Link to={`/decks/${deckId}/cards/${card.id}/edit`}><button>Edit</button></Link>
                                            <button onClick={() => cardDelete(card.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}