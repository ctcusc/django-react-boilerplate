import React from 'react'
import { Route, Switch } from 'react-router'

import Index from './components/index.js'
import Hello from './components/hello.js'

export default (
  <Switch>
    <Route exact path='/' component={Index} />
    <Route path='/index' component={Index} />
    <Route path='/hello' component={Hello} />
  </Switch>
);
