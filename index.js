const express = require("express");
const { MongoClient, Collection, ObjectId } = require("mongodb");

// const url = "mongodb://127.0.0.1:27017";
// const url = "mongodb://localhost:27017";
const url = "mongodb+srv://admin:j0R9PnLieOjsI8jU@cluster0.qs1ficz.mongodb.net"
const dbName = "jornada-backend";
const client = new MongoClient(url);

async function main() {
    console.info("Conectando ao banco de dados...")
    await client.connect();
    console.info("Banco de dados conectado com sucesso!")

    const db = client.db(dbName);
    const collection = db.collection("herois");

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
    app.get("/herois", async function (req, res) {
        const itens = await collection.find().toArray();
        res.send(itens);
    });

    // Create -> [POST] /herois
    app.post("/herois", async function (req, res) {        
        const item = req.body;

        // Inserir o item na collection
        await collection.insertOne(item)
        res.send(item)
    });

    // Read by ID -> GET /herois/:id
    // usamos ":" no express

    app.get("/herois/:id", async function(req, res) {
        // parametro de rota
        // Pegar o parâmetro e salvar na const id
        const id = req.params.id;

        // Pegar a informação da collection
        const item = await collection.findOne({ _id: new ObjectId(id) });

        res.send(item)
    });


    // Update -> [PUT] /herois/:id
    app.put("/herois/:id", async function (req, res) {
        const id = req.params.id;
        const item = req.body;

        // Atualizar item na collection
        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: item}
        );

        res.send(item)
    });


    // Delete -> [DELETE] /herois/:id
    app.delete("/herois/:id", async function (req, res) {
        const id = req.params.id;
        await collection.deleteOne({ _id: new ObjectId(id) });
        res.status(204).send()
    })

    app.listen(3000);
}

main();