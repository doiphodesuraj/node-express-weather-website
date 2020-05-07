const request = require('request');

const geolocation = (place, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(place) +'.json?access_token=pk.eyJ1IjoiZG9pcGhvZGVzdXJhaiIsImEiOiJjazlmYWtjdTcwOW5jM2V0YnF5aXJ2bWlzIn0.N4SPynh6yd0y0PBM9o1kNw&limit=1';
    request({url, json: true}, (err, { body }) =>{
        if (err) {
            callback('Unable to connect...!!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location find another', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
};

module.exports = geolocation;