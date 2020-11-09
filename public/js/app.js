// Select all necessary page components 
const weatherForm = document.querySelector('form')
const search = document.querySelector('#search')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherIcon = document.getElementById('icon')


// trigger APIs on submit
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''
    weatherIcon.src = ""

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                weatherIcon.src = ''
            } else {
                messageOne.textContent = "Live weather for " + data.location
                messageTwo.textContent = "It is currently " + data.weather + " and the temperature is " + data.temperature + ". However, it actually feels like " + data.feels + ". There is a wind speed of " + data.windspeed + "km/h coming in from the " + data.winddirection
                weatherIcon.src = data.image
            }
        })
    })
})