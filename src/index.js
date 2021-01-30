// vendors
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

// components
import App from "./App";
import Create from "./components/Create";
import Edit from "./components/Edit";

import './index.css'

const client = new ApolloClient({
  uri: "https://cafe-app.hasura.app/v1/graphql",
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <div className=" flex flex-col min-h-screen">
      <header className="bg-white-300 py-4 px-5 flex items-center">
        <h2 className="text-sm uppercase text-gray-700 tracking-widest font-bold">Cafe React</h2>
      </header>
      <div className="bg-gray-200 flex-1">
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={App} />
              <Route exact path="/create" component={Create} />
              <Route exact path="/edit/:id" component={Edit} />
            </Switch>
          </BrowserRouter>
        </ApolloProvider>
      </div>
    </div>
  </React.StrictMode>,
  rootElement
);
