const { Router } = require("express");
const { getWeather } = require("../controllers/weather.controller");

const router = Router();

router.route("/").get(getWeather);

module.exports = router;