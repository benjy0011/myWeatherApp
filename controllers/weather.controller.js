const axios = require("axios");
const { getWeatherIcon } = require("../helpers/helper");


const getWeather = async (req, res) => {
    // extract value from query parameter `q` (eg: /forecast?q=London)
    const city = req.query.q;

    try {
        // handling missing city query
        if (!city) {
            res.status(400).json({ msg: "Invalid query "});
        } else {
            // geocoding the city
            const geocodeData = await getGeocodeData(city);

            // handling empty result
            if (geocodeData.results.length === 0) {
                res.status(400).json({ msg: "No data found" });
            } else {
                // obtain the first result only, the api may return multiple results
                const { lat, lng } = geocodeData.results[0].geometry;
                
                // get weather data from latitude and longitude obtained above
                // no error handling require as OPENMETEO will take in any lat and lng
                const weatherData = await getWeatherData(lat, lng);

                res.status(200);

                // store hourly temperature upto 8 hour
                const hourlyWeatherArray = weatherData.hourly.time.map((time, i) => ({
                    time: time.slice(-5),
                    date: time.slice(5, 10),
                    temperature: `${weatherData.hourly.temperature_2m[i]} ${weatherData.current_units.temperature_2m}`,
                    code: weatherData.hourly.weather_code[i],
                }));

                // forecast.ejs
                res.render("forecast", { 
                    location: geocodeData.results[0].formatted,
                    latitude: weatherData.latitude,
                    longitude: weatherData.longitude,
                    temperature: `${weatherData.current.temperature_2m} ${weatherData.current_units.temperature_2m}`,
                    windSpeed: `${weatherData.current.wind_speed_10m} ${weatherData.current_units.wind_speed_10m}`,
                    windDirection: `${weatherData.current.wind_direction_10m}${weatherData.current_units.wind_direction_10m}`,
                    hourlyWeather: hourlyWeatherArray,
                    getWeatherIcon,
                });
            }
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getGeocodeData = async (city) => {
    const { OPENCAGE_API_KEY } = require("../config/secrets");
    // OPENCAGE url
    const request = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${OPENCAGE_API_KEY}&pretty=1`;

    const response = await axios.get(request);

    return response.data;
};

const getWeatherData = async (lat, lng) => {
    // OPENMETEO url
    const request = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code`;

    const response = await axios.get(request);

    return response.data;
}

module.exports = { getWeather };