// import lib
const express = require("express");
const path = require("path");

// import dir
const { router } = require("./routers");
const { PORT } = require("./config/secrets");

// initialize express
const app = express();

// set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// middleware
app.use(express.json());
app.use(express.static("./public"));

// routers
app.use("/", router);

// run server
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});