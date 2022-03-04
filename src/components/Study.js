import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";


export default function Study() {
  const [currentCard, setCurrentCard] = useState(0)
  const [flip, setFlip] = useState(false)
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([])
  let { deckId } = useParams();

  //calls the readDeck function and places the data into the deck state and the cards state
  useEffect(() => {
    async function getCard() {
      const response = await readDeck(deckId);
      setDeck(response);
      setCards(response.cards)
    }
    getCard(deckId);
  }, [deckId]);

  //Gets the next card in the deck and asks (and resets) if they would like to restudy that deck
  function getNextCard() {
    if (currentCard === cards.length - 1) {
      const result = window.confirm(
        "Restart the deck and study again?"
      );
      if (result) {
        setCurrentCard(0);
      }
    } else {
      setCurrentCard(currentCard + 1);
      setFlip((prevState) => !prevState);
    }
  }

  //flips the card data from "card.front" to "card.back"
  function flipCard() {
    setFlip((prevState) => !prevState);
  }


  if (cards.length >= 3) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>Currently Studying: {deck.name} </h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {currentCard + 1} of {cards.length}
            </h5>
            <p className="card-text">
              {!flip ? cards[currentCard].front : cards[currentCard].back}
            </p>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={flipCard}
          >
            Flip
          </button>
          {flip ? <button className="btn btn-primary" onClick={getNextCard}>Next</button> : null}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>{deck.name}: Study</h1>
        <h2>Not enough cards.</h2>
        <p>You need at least 3 cards  to study. There are {cards.length} in this deck.</p>
        <Link to={`/decks/${deckId}/cards/new`}><button>Add Card</button></Link>
      </div>
    )
  }
}