const path = require('path')
const express = require('express')
const hbs = require('hbs');
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public');
const templateDirctoryPath = path.join(__dirname, '../template/views');
const partialDirctoryPath = path.join(__dirname, '../template/partial');
const geocode = require('./utility/geolocation');
const forecast = require('./utility/forecast');
const port = process.env.PORT || 3000;
app.set('view engine', 'hbs')
app.set('views', templateDirctoryPath)
app.use(express.static(publicDirectoryPath))

hbs.registerPartials(partialDirctoryPath);
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Suraj Doiphode'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Suraj Doiphode'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'For more help call me',
        title: 'Help',
        name: 'Suraj Doiphode'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please Provide Address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (err, resp) => {
            if (err) {
                return res.send({
                    err
                })
            }
            res.send({
                forecast: resp.current.weather_descriptions[0] + '. It is currently ' + resp.current.temperature + ' Degrees out. There is a ' + resp.current.precip + '% of chance of rain.',
                temparature: resp.current.temperature,
                rain: resp.current.precip,
                location: location,
                address: req.query.address,
                time: resp.location.localtime
            })
        })
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Suraj Doiphode'
    })
})
app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})