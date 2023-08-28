const express = require("express");
const app = express();


// Endpoint principal
app.get("/", function (req, res) {
    res.send("Hello, world!");
});

// Endpoint "/oi"
app.get("/oi", function (req, res) {
    res.send("Olá, mundo!");
});

app.listen(3000);