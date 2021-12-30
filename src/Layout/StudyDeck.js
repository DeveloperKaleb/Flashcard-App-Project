import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api/index";

function StudyDeck({ currentDeck, chooseDeck }) {
  const { url } = useRouteMatch();
  const { deckId } = useParams();
  const history = useHistory();
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState([]);
  const [count, setCount] = useState(0);

  const flipHandler = () => {
    setIsFlipped((prevState) => !prevState);
  };
  
  // useEffect grabs card data and sets the deck object upon render
  useEffect(() => {
    async function loadSelectedDeck() {
      const response = await readDeck(deckId);
      setCards(response.cards);
      chooseDeck(response);
    }
    loadSelectedDeck();
  }, [deckId, chooseDeck]);

  useEffect(() => {
    if (count) {
      if (count + 1 > cards.length) {
        return window.confirm(
          "Restart cards? Click 'cancel' to return to the home page."
        )
          ? setCount(0)
          : history.push("/");
      }
      flipHandler();
    }
  }, [count, history, cards.length]);

  const countHandler = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const cardDisplay = cards.map((card, index) => (
    <div key={card.id}>
      <h3>{`Card ${index + 1} of ${cards.length}`}</h3>
      <p>{isFlipped ? card.back : card.front}</p>
      <button type="button" onClick={flipHandler}>
        Flip
      </button>
      {isFlipped ? (
        <button type="button" onClick={countHandler}>
          Next
        </button>
      ) : null}
    </div>
  ));

  const currentCard = cardDisplay.filter((card, index) => {
    return index === count;
  });

  const notEnoughCards = (
      <>
        <h3>Not enough cards.</h3>
        <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
        <button type="button" onClick={() => history.push(`/decks/${currentDeck.id}/cards/new`)}>+ Add Cards</button>
      </>
  )

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={url}>{currentDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>{`Study: ${currentDeck.name}`}</h2>
      <div>{cards.length > 2 ? currentCard : notEnoughCards}</div>
    </>
  );
}

export default StudyDeck;
