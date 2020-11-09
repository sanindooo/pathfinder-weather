const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// define path for epxress config
const publicDirectoryPath = path.join(__dirname, '../public')
// use this to point express to views folder
// express is looking specifically for views, so use this if changed 
// the name and location of the folder   
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// express expects all views to live in root of folder
// put handle bars views into views folder in root
// views let you serve dynamic content  
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Stephen Anindo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Stephen Anindo'
    })
})

app.get('/weather-search', (req, res) => {
    res.render('weather-search', {
        title: 'Help',
        helpText: 'This is the help page',
        name: 'Stephen Anindo'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude , longitude, (error, {weather, temperature, feels, image, windspeed, winddirection, time, localtime} = {}) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                weather,
                temperature,
                feels,
                image,
                windspeed,
                winddirection,
                time,
                localtime,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Sorry. Help article not found.',
        title: '404',
        name: 'Stephen Anindo'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Oops.. Page not found',
        title: '404',
        name: 'Stephen Anindo.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})