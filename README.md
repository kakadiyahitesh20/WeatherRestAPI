# A REST-based weather service

The goal of your test is to develop a small REST based service to retrieve information about the weather in different cities.
The service should be powered by node.js and utilize the data from openweathermap.org.
The list of available cities can be found [here](http://bulk.openweathermap.org/sample/city.list.json.gz).
Besides the requirement to use node.js, you are free to use any library or tool you need to develop the service.

# Requirements
<li>Node JS</li>
<li>Hapi JS</li>

# Features/Services
<li>GET /cities/{latitude}/{longitude}` List the available cities around the specified latitude/longitude within a radius of 10 kilometers</li>
<li>GET /cityInfo/{city_id} Retrieve the details for a city by cityId</li>
<li>GET /cityWeather/{city_id} Retrieve the weather data for a city by cityId</li>

#Useful Tools
<li><a href="https://www.jetbrains.com/webstorm/"  target="_blank">jetbrains webstorm</a> : JavaScript IDE</li>

# Getting Started Locally
Make sure you have Node.js installed.
<pre>git clone https://github.com/kakadiyahitesh20/WeatherRestAPI.git # or clone your own fork
npm install
npm start</pre>
Your app should now be running on http://localhost:3000/documentation.

# Docker

Make sure you have Docker installed.

#Build Image
$ docker build -t weatherapi

#Run Image
$ docker run -p 3000:3000 -d /WeatherRestAPI

#The following libraries and tools could be helpful to implement the service:
<li>Restify (http://restify.com/) ­ as the baseline to implement the REST web service</li>
<li>Request (https://github.com/request/request) ­ to make requests to the http://openweathermap.org/ API</li>
<li>Postman (https://www.getpostman.com/) or curl to test the service</li>


# Contact
Email : <a href="mailto:kakadiyahitesh20@gmail.com">kakadiyahitesh20@gmail.com</a>
