const request = require('request');

const forecast = ( latitude, longitude, callback ) =>{
    const url = 'http://api.weatherstack.com/current?access_key=181f420044cb03731025457a457fd4c6&query='+ latitude + ','+ longitude;
    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect forecast..!!!', undefined);
        } else if (body.error) {
            callback(body.error.info, undefined);
        } else {
            // const data = body;
            callback(undefined, body );
        }
    })
}

module.exports = forecast;