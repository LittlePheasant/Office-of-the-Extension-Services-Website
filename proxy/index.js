const express = require("express");
const app = express();
//const cors = require("cors");
const {createProxyMiddleware} = require("http-proxy-middleware");

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.get("/", 
        createProxyMiddleware({target: 'https://office-of-the-extension-services.000webhostapp.com/apiConnection', 
        changeOrigin:true}),
        (req, res) => {
            console.log(res);
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