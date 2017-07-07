import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'

const isDev = process.env.NODE_ENV == 'development'
const routesPath = '../client/routes';

let routes = require(routesPath).default;

export default (req, res) => {
  if (isDev) {
    console.log('[dev] hot-reloading routes');
    // clear all the loaded modules from the cache
    Object.keys(require.cache).forEach((key) => delete require.cache[key])
    routes = require(routesPath).default;
  }
  const context = {}
  const appHtml = renderToString(
    <StaticRouter location={req.url} context={context}>
      {routes}
    </StaticRouter>
  );

  if (context.url) {
    // a React <Redirect> happened
    res.redirect(301, context.url);
  } else {
    res.send(renderPage(appHtml));
  }
}

function renderPage(html) {
  return `
    <!DOCTYPE html>
      <head>
        <meta charset="utf-8">
        <title>django-react-starter</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script type="text/javascript" src="static/main.bundle.js"></script>
      </body>
    </html>
  `;
}
