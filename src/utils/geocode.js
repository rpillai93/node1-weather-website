/**********************************************************************************************************************************/
const request = require('request');



var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLEGEOCODE_API_KEY}`,
      json: true
    }, (error, response, body) => {

      if (error)

        reject('The MapQuest API service is not communicating.');

      else if (address.length === 0 || body === undefined || body.results.length === 0 )
        reject('The location address could not be found or was vague. Please provide proper address details.');
      else {
        // console.log(body.results[0].providedLocation.location);
        // console.log(body.results[0].locations[0].latLng.lat);
        // console.log(body.results[0].locations[0].latLng.lng);
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });

      }

    });
  });

};
/**********************************************************************************************************************************/
module.exports.geocodeAddress = geocodeAddress;
