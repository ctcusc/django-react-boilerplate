import React from 'react'
import { render } from 'react-dom'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'
import { Router, Route } from 'react-router'
import { createBrowserHistory } from 'history'

import routes from './routes.js'

const client = new ApolloClient({});

const history = createBrowserHistory();

const root = (
  <ApolloProvider client={client}>
    <Router history={history}>
      {routes}
    </Router>
  </ApolloProvider>
);

render(root, document.getElementById('app'));
