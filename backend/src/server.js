const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect(
  'mongodb+srv://omnistack:0mn1st4ck@omnistack9-at8mz.mongodb.net/week09?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

// Query params: req.query (filters)
// Route params: req.params (editing, deleting)
// Request body: req.body (creting, editing)

app.use(express.json());
app.use(routes);

app.listen(3333);
