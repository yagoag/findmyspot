require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_OPTS } = process.env;
mongoose.connect(
  `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}${DB_OPTS}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

// Query params: req.query (filters)
// Route params: req.params (editing, deleting)
// Request body: req.body (creting, editing)

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333);
