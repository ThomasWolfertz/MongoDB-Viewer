const PORT = 3000;
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const databaseRoutes = require('./routes/databaseRoutes');

const app = express();

// register view engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


// default routes
app.get('/', (req, res) => {
  res.redirect('/database/settings');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// routes
app.use('/database', databaseRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

app.listen(PORT, () => {
  console.log(`Server listening c on ${PORT}`);
});