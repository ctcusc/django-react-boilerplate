import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import { createBrowserHistory } from 'history'

import routes from './routes.js'


const history = createBrowserHistory();

const router = (
  <Router history={history}>
    {routes}
  </Router>
);

render(router, document.getElementById('app'));
