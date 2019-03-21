     const request = require('request');
     var getWeather = (results) => {
       return new Promise((resolve,reject) => {
      request({
        url: `https://api.darksky.net/forecast/fd5407c7220015001da67ea92cb695c8/${results.latitude},${results.longitude}`,
        json: true
      }, (error, response, body) => {
        console.log(results);
            if(!error)
            {
              var tempF=body.currently.temperature;
               var tempC=parseFloat((tempF-32)/1.8).toFixed(2);
               var condition = `the surrounding weather conditions for "${results.address}" suggest: ${body.hourly.summary}`;
               var FtempHi=body.daily.data[0].temperatureHigh;
               var FtempLo=body.daily.data[0].temperatureLow;
               var CtempHi=parseFloat((FtempHi-32)/1.8).toFixed(2);
               var CtempLo=parseFloat((FtempLo-32)/1.8).toFixed(2);

               resolve({CtempHi,
                 CtempLo,
                condition,
                 tempC,
                 results
               });
            }
             else {
               reject('Unable to fetch weather.');
             }

      });
    });
    };

    module.exports.getWeather = getWeather;
