/**********************************************************************************************************************************/
const request = require('request');



var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);
    request({
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=DEPUk69fAPkFQ9CCwuD4ux6CTVhgdsWM&location=${encodedAddress}`,
      json: true
    }, (error, response, body) => {

      if (error)

        reject('The MapQuest API service is not communicating.');

      else if (address.length === 0 || body === undefined || body.results[0].locations[0].geocodeQualityCode === 'A1XAX')
        reject('The location address could not be found or was vague. Please provide proper address details.');
      else {
        // console.log(body.results[0].providedLocation.location);
        // console.log(body.results[0].locations[0].latLng.lat);
        // console.log(body.results[0].locations[0].latLng.lng);
        resolve({
          address: body.results[0].providedLocation.location,
          latitude: body.results[0].locations[0].latLng.lat,
          longitude: body.results[0].locations[0].latLng.lng
        });

      }

    });
  });

};
/**********************************************************************************************************************************/
module.exports.geocodeAddress = geocodeAddress;
