'use strict';

module.exports = function (server, options, controllers, components) {

  const { WeatherController } = controllers;
  const { GetCitieWeatherByLatLong } = components.schema;
  const { GetCitieWeatherByCityId } = components.schema;

  return [
    {
      method: 'GET',
      path: "/cities/{lat}/{lon}",
      config: {
        handler: WeatherController.findCitiesByLatLon,
        description: 'Get cities weather info by lat and lon',
        tags: ['api'],
        validate: GetCitieWeatherByLatLong
      }
    },
   {
       method: 'GET',
       path: "/cityWeather/{cityId}",
       config: {
           handler: WeatherController.findCityWeatherByCityID,
           description: 'Get city weather info by city id',
           tags: ['api'],
           validate: GetCitieWeatherByCityId
       }
    },
    {
        method: 'GET',
        path: "/cityInfo/{cityId}",
        config: {
           handler: WeatherController.findCityInfoByCityID,
           description: 'Get city info by city id',
           tags: ['api'],
           validate: GetCitieWeatherByCityId
      }
    },
  ];
};