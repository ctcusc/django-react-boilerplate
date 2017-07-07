import React from 'react'
import { Route, Switch } from 'react-router'

import Index from './components/index.js'

export default (
  <Switch>
    <Route path='/' component={Index} />
    <Route path='/index' component={Index} />
  </Switch>
);
