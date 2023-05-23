const express = require("express");
const app = express();
const cors = require("cors");
const {createProxyMiddleware} = require("http-proxy-middleware");

app.use(cors());
app.get("/", createProxyMiddleware({target: 'https://office-of-the-extension-services.000webhostapp.com/apiConnection', changeOrigin:true}))

app.listen(4200,()=>{
    console.log("proxy started");
})