import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../components/Home";
import { Switch, Route } from "react-router-dom";
import CreateDeck from "../components/CreateDeck";
import Study from "../components/Study";
import View from "../components/View";
import EditDeck from "../components/EditDeck";
import EditCard from "../components/EditCard";
import CardCreate from "../components/CardCreate";

function Layout() {

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <View />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CardCreate />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;

