const request = require("request");

const forcast = (lattitude, logitude, callBack) => {

  const url =
    `http://api.weatherstack.com/current?access_key=e966dd82ee59706800c8d7b00feb0c94&query=` +
     +logitude
    +`,` +
    lattitude;
 
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callBack("unable to connect to wather service", undefined);
    } else if (response.body.error) {
      callBack("unable to find location", response.body.error);
    } else {
      callBack(undefined, "current temperature is " +response.body.current.temperature+" and feel like "+response.body.current.feelslike );
    }
  });
};

module.exports = forcast;
