import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { listDecks } from "../utils/api/index";

import AddCard from "./AddCard";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckDisplay from "./DeckDisplay";
import CreateDeck from "./CreateDeck";
import StudyDeck from "./StudyDeck";
import ViewDeck from "./ViewDeck";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";

function Layout() {
  const [currentDeck, setCurrentDeck] = useState({});
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      const response = await listDecks();
      setDecks(response);
    }
    loadDecks();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <DeckDisplay
              decks={decks}
              currentDeck={currentDeck}
              chooseDeck={setCurrentDeck}
            />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck currentDeck={currentDeck} chooseDeck={setCurrentDeck} />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck currentDeck={currentDeck} chooseDeck={setCurrentDeck} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard currentDeck={currentDeck} chooseDeck={setCurrentDeck} />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck currentDeck={currentDeck} chooseDeck={setCurrentDeck} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard currentDeck={currentDeck} chooseDeck={setCurrentDeck} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
