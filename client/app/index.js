import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import PostList from 'post/scenes/PostList';
import PostInformation from 'post/scenes/PostInformation';
import App from './components/App';

import { store, history } from './createStore';

/*
  All redux applications are wrapped around a <Provider />, which can be thought of as a container object
  holding the entire Redux store.

  Next, we have our actual <Router /> component which will dynamically match the route path to its matching component.
  For example, if we had 'www.reddit.com/post/12345', it would get matched to <Route path="post/:id" component={PostInformation} />
  with 12345 being passed in as a match parameter (which we will extract in the PostInformation.js component).

  However, if our route doesn't match post/:id, then it will default to the IndexRoute.

  NOTE: We are using React-Router 3, not React-Router 4. Don't use 4. It's bad. \s
*/
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={PostList} />
        <Route path="post/:id" component={PostInformation} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
