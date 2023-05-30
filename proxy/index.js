const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = process.env.PORT || 4200;

const uri = 'mongodb+srv://palencia.kenneth69@gmail.com:000MONGO_dbVercel@keanna@cluster0.xpjxeel.mongodb.net/?retryWrites=true&w=majority';
//const cors = require("cors");
//const {createProxyMiddleware} = require("http-proxy-middleware");

app.use(express.json());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const client = new MongoClient(uri);
    //try // continue
}
    );

app.post("/", 
    createProxyMiddleware({target: 'https://office-of-the-extension-services.000webhostapp.com/apiConnection', 
    changeOrigin:true}),
    (req, res) => {
        console.log(res);
    }
);

app.put("/", 
        createProxyMiddleware({target: 'https://office-of-the-extension-services.000webhostapp.com/apiConnection', 
        changeOrigin:true}),
        (req, res) => {
            console.log(res);
        }
    );

app.delete("/", 
    createProxyMiddleware({target: 'https://office-of-the-extension-services.000webhostapp.com/apiConnection', 
    changeOrigin:true}),
    (req, res) => {
        console.log(res);
    }
);

app.listen(4200,()=>{
    console.log("proxy started");
})