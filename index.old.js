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

// Endpoint "/teste"
app.get("/teste", function (req, res) {
    // res.sendFile(__dirname + "/teste.html")
    res.sendFile("teste.html", { root: __dirname })
})

app.listen(3000);