require('dotenv').config();
const express = require('express');
const cors = require("cors");
const { MongoClient } = require("mongodb");
const router = require('./APIs/modelapp');

const app = express();
app.use(cors());


const client = new MongoClient(process.env.DB_URI);
client
    .connect()
    .then(() => {
        const db = client.db("outfitDB");
        console.log("Database Connected Successfully.");
    })
    .catch ((err)=> {
        console.log(err);
    });


app.use(express.json());
app.use("/model", router)


app.listen(4700, () => console.log(`Server is running on port ${process.env.PORT}`));
