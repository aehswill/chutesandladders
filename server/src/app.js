const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./routes');

const app = express();



app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// app.get('/', (req, res) => {
//   res.json({
//     message: '🦄🌈✨👋🌎🌍✨🌈🦄'
//   });
// });

// app.use('/api/v1', api);

app.use('/', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;