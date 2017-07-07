const express = require('express');
const morgan = require('morgan');

// this is probably really bad for production, look into later
require('babel-register')({presets: ['env', 'react']});
require('babel-polyfill');

const app = express();

const port = app.get('port') || 3000;

const render = require('./render').default;

app.use(morgan('dev'));
app.use('/static', express.static('../client/dist'));
app.get('*', render);

app.listen(port, () => {
  console.log('Listening on port ' + port)
});
