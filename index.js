/* eslint-disable no-console */
const express = require('express');
const connection = require('./database/database');
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

const app = express();

// View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// parse application
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Database
connection
  .authenticate()
  .then(() => console.log('Authentication in database!'))
  .catch((error) => console.log(error));

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/categories', categoriesController);
app.use('/articles', articlesController);

app.listen('8080', () => {
  console.log('Started server!');
});
