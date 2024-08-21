const getWeatherIcon = (weatherCode, time24) => {
    const iconMap = {
        0: (Number(time24) >= 600 && Number(time24) <= 1900) ? "fa-solid fa-sun" : "fa-solid fa-moon",
        1: (Number(time24) >= 600 && Number(time24) <= 1900) ? "fa-solid fa-cloud-sun" : "fa-solid fa-cloud-moon",
        2: (Number(time24) >= 600 && Number(time24) <= 1900) ? "fa-solid fa-cloud-sun" : "fa-solid fa-cloud-moon",
        3: (Number(time24) >= 600 && Number(time24) <= 1900) ? "fa-solid fa-cloud-sun" : "fa-solid fa-cloud-moon",
        45: "fa-solid fa-smog",
        48: "fa-solid fa-smog",
        51: "fa-solid fa-droplet",
        53: "fa-solid fa-droplet",
        55: "fa-solid fa-droplet",
        56: "fa-solid fa-temperature-arrow-down",
        57: "fa-solid fa-temperature-arrow-down",
        61: "fa-solid fa-cloud-rain",
        63: "fa-solid fa-cloud-rain",
        65: "fa-solid fa-cloud-rain",
        66: "fa-solid fa-cloud-rain",
        67: "fa-solid fa-cloud-rain",
        71: "fa-solid fa-snowflake",
        73: "fa-solid fa-snowflake",
        75: "fa-solid fa-snowflake",
        77: "fa-solid fa-icicles",
        80: "fa-solid fa-cloud-showers-heavy",
        81: "fa-solid fa-cloud-showers-heavy",
        82: "fa-solid fa-cloud-showers-heavy",
        95: "fa-solid fa-bolt",
        96: "fa-solid fa-bolt",
        99: "fa-solid fa-bolt",
    };

    return iconMap[weatherCode];
};

module.exports = { getWeatherIcon };
