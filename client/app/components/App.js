import React from 'react';

/*
If we look in index.js under the 'app' folder, we see that App is nested here:

<Route path="/" component={App}>
  <IndexRoute component={PostList} />
  <Route path="post/:id" component={PostInformation} />
</Route>

The <Route /> component acts as wrapper around the actual 'App' component, which in turn renders its
children (IndexRoute, Route).

In this case, App is a FUNCTIONAL COMPONENT that takes in a prop (children) and renders its children within a div.
Anything passed in-between opening and closing tags of a React component gets passed to its props as 'children'.
*/

function App({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}

export default App;
