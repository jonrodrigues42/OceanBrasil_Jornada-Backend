const express = require("express");
const app = express();

// Habilitamos o processamento de JSON
app.use(express.json());

// Endpoint Principal
app.get("/", function (req, res) {
    res.send("Hello World");
});

// Endpoint /oi
app.get("/oi", function (req, res) {
    res.send("Olá, mundo!");
});

// Endpoints de Herois
const lista = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"];
//             0                    1                2

// Read All -> [GET] /herois
app.get("/herois", function (req, res) {
    res.send(lista);
});

// Create -> [POST] /herois
app.post("/herois", function (req, res) {
    // console.log(req.body, typeof req.body);
    
    const item = req.body.nome;
    lista.push(item)
    res.send("Item criado com sucesso!")

});

// Read by ID -> GET /herois/:id
// usamos ":" no express

app.get("/herois/:id", function(req, res) {
    // parametro de rota
    // Pegar o parâmetro e salvar na const id
    const id = req.params.id - 1;

    // Pegar a informação da lista
    const item = lista[id];

    res.send("ID recebido: " + id + "\nCorresponde ao item: " + item)
});


// Update -> [PUT] /herois/:id
app.put("/herois/:id", function (req, res) {
    const id = req.params.id - 1;
    const item = req.body.nome;

    lista[id] = item

    res.send("Item editado com sucesso")
});


app.listen(3000);