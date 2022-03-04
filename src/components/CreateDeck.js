import React, { useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { createDeck, deleteDeck } from "../utils/api";

export default function CreateDeck() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();
    const form = {
        "name": name,
        "description": description,
    };
    //Changes name of deck
    const handleName = (event) => setName(event.target.value);

    //Changes description of deck
    const handleDescription = (event) => setDescription(event.target.value);

    //Submits the deck form than goes back to home screen
    const handleSubmit = (event) => {
        event.preventDefault();
        createDeck(form).then((result) => history.push(`/`))
    };

    return (
        <div>
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
                <label htmlFor="name">
                    Deck Name:
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleName}
                    />
                </label>
                <br />
                <label htmlFor="description">
                    Description:
                    <textarea
                        name="description"
                        id="description"
                        onChange={handleDescription}
                    />
                </label>
                <br />
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => history.push("/")}
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
