const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const weather = require('./utils/weather.js');
const dotenv=require('dotenv').config()
const port = process.env.PORT || 3000
console.log(__dirname);
console.log(path.join(__dirname));


const app = express();

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup Handlebars Engine and view locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
/******************************************************************************/
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Rahul Pillai',
    footTitle: 'Created by Rahul Pillai'
  });
})
/******************************************************************************/
app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This page will help you get through.',
    title: 'Help',
    name: 'Rahul Pillai',
    footTitle: 'Created by Rahul Pillai'
  });
})
/******************************************************************************/
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Rahul Pillai',
    footTitle: 'Created by Rahul Pillai'
  })
})

/******************************************************************************/
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      errorMessage: 'You must provide an address'
    });
  }

  geocode.geocodeAddress(req.query.address).then((results) => {

    return weather.getWeather(results);
  }).then((temp, results) => {

    res.send({
      temp,
      results
    });
  }).catch((errorMessage) => {
    res.send({
      errorMessage
    });
  });

});

/******************************************************************************/
app.get('/help/*', (req, res) => {
  res.render('404', {
    name: "Rahul",
    title: "404",
    error404: 'Help Article not found'
  })

})
/******************************************************************************/
app.get('*', (req, res) => {
  res.render('404', {
    title: "404",
    name: "Rahul",
    error404: 'Page Not Found'
  })

})
/******************************************************************************/
app.listen(port, () => {

  console.log('Server is up on port' +port);
}); //3000 is a common development port
