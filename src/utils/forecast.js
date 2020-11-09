const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=97368f3672f834f6c292f86ae8566e85&query='+ latitude +',' + longitude +''

    request ({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to establish netowrk connection', undefined)
        } else if (body.error) {
            callback('Unable to find location. Please try a new search.', undefined)
        } else {
            callback(undefined, {
                weather: body.current.weather_descriptions[0], 
                temperature: body.current.temperature, 
                feels: body.current.feelslike,
                image: body.current.weather_icons[0], 
                windspeed: body.current.wind_speed,
                winddirection: body.current.wind_dir,
                time: body.current.observation_time,
                localtime: body.location.localtime
            })
        }
    })
}

module.exports = forecast

