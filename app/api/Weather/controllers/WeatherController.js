'use strict';
const OpenWeatherMapHelper = require("openweathermap-node");
var GeoPoint = require('geopoint');
const path = require('path')
// Request File System Module
var fs = require('fs');
const Math = require('mathjs')

const helper = new OpenWeatherMapHelper(
    {
        APPID: '3f9bfcf957b0e7b84528a35f5454486b',
        units: "imperial"
    }
);

const reqPath =   process.cwd()+'/city.list.json';

module.exports = function (server, options, services) {

  const { WeatherrService } = services;

    /**
     * Calculate distance of two points.
     *
     * @param {lat} - The latitude of area.
     * @param {lon} - The longitude of area.
     */

    function calcDistance(lat1, lon1, lat2, lon2) {
        lat1 = parseFloat(lat1);
        lon1 = parseFloat(lon1);
        if ((lat1 === lat2) && (lon1 === lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344  // for kilometer unit
            return dist;
        }
    }


    return {

        /**
         * Find cities by lat and lon from city list json
         *
         * @param {lat} latitude of the city.
         * @param {lon} longitude of the city
         */


        findCitiesByLatLon: function (request, reply) {

          fs.readFile(reqPath , 'utf8', function (err, data) {
              //Handle Error
              if(!err) {
                  //Handle Success
                  // Parse Data to JSON OR
                  var jsonObj = JSON.parse(data);

                  var arrayFound = jsonObj.filter(function (item) {
                      let distance = calcDistance(request.params.lat,request.params.lon,item.coord.lat, item.coord.lon);
                      if (distance>=0 && distance<10){
                          return true;
                      }
                      return false;
                  }).map(function (obj) {
                      return obj;
                  });
                  if(arrayFound.length > 0) {
                      reply({status: "SUCCESS",results : arrayFound});
                  } else {
                      reply({code: "NotFoundError",message : "Not Found"});
                  }
              }else {
                  //Handle Error
                  console.log(err);
              }
          });
    },

        /**
         * Find weather of city by city id using open weather map api
         *
         * @param {cityId} cityId of the city.
         */


      findCityWeatherByCityID: function (request, reply) {

          helper.getCurrentWeatherByCityID(request.params.cityId, (err, currentWeather) => {
              if(err){
                  reply({code : 'NotFoundError',message : 'Not Found'});
              }
              else{
              if(currentWeather) {
                  reply({status: "SUCCESS",results : [currentWeather]});
              } else {
                  reply({error : 'Enter a valid city id'});
              }
      }
      })
      },

        /**
         * Find city info by city id using city list json
         *
         * @param {cityId} cityId of the city.
         */


        findCityInfoByCityID: function (request, reply) {

          let cityId = request.params.cityId;
          //Read JSON from relative path of this file
          fs.readFile(reqPath , 'utf8', function (err, data) {
              //Handle Error
              if(!err) {
                  //Handle Success
                  // Parse Data to JSON OR
                  var jsonObj = JSON.parse(data)
                  var arrayFilter = jsonObj.filter(item =>
                         item.id == cityId
                     );

                  if(arrayFilter.length > 0) {
                      reply({status: "SUCCESS",results : arrayFilter});
                  } else {
                      reply({code: "NotFoundError",message : "Not Found"});
                  }
              }else {
                  //Handle Error
                  console.log(err);
              }
          });
      },
  };

};