import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";


export default function Home() {
    const history = useHistory();
    const [decks, setDecks] = useState([]);
    const { deckId } = useParams();

    //gets the list of decks
    useEffect(() => {
        async function getDecks() {
            const dataFromAPI = await listDecks();
            setDecks(dataFromAPI);
        }
        getDecks();
    }, []);

    //handles the deletion of a deck if the "Delete" button is clicked
    async function handleDelete(deckId) {
        const confirm = window.confirm("Delete this deck? You will not be able to recover it.")
        if (confirm) {
            await deleteDeck(deckId);
            history.go(0);
        }
    }

    return (
        <div className="card">
            <Link to="/decks/new"><button>Create Deck</button></Link>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    {decks.map((deck) => (
                        <li key={deck.id}>
                            <div className="list-group-item">
                                <div className="row">
                                    <div className="col-auto mr-auto">
                                        <h3>{deck.name}</h3>
                                    </div>
                                    <div className="col-auto">
                                        <p>{deck.cards.length} cards</p>
                                    </div>
                                </div>
                                <p>{deck.description}</p>
                                <div className="row">
                                    <div className="col-auto mr-auto">
                                        <Link to={`/decks/${deck.id}`}><button>View</button></Link>
                                        <Link to={`/decks/${deck.id}/study`}><button>Study</button></Link>
                                    </div>
                                    <div className="col-auto">
                                        <button onClick={() => handleDelete(deck.id)}>Delete Deck</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
