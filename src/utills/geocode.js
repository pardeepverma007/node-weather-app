const request = require("request");

const geocode = (address, callBack) => {
  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
    address +
    `.json?access_token=pk.eyJ1IjoicGFyZGVlcGt1bWF3YXQxMzkiLCJhIjoiY2xqaHg2bTgyMGhoNjNwbzVxcmZoOWV4NCJ9.qjwcBOeNfP_Xed_ju2OzsA`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callBack("enable to connect to location service.", undefined);
    } else if (response.body.features?.length == 0) {
      callBack("unable to find loaction. try another search.", undefined);
    } else {
      callBack(undefined, {
        lattitude: response.body.features[0].center[0],
        logitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
