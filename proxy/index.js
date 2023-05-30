const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = process.env.PORT || 4200;

const uri = 'mongodb+srv://palencia.kenneth69@gmail.com:000MONGO_dbVercel@keanna@cluster0.xpjxeel.mongodb.net/?retryWrites=true&w=majority';
//const cors = require("cors");
//const {createProxyMiddleware} = require("http-proxy-middleware");

app.use(express.json());

app.post('api/register', async (req, res) => {
    const { username, password, cpassword } = req.body;

        const client = new MongoClient(uri);
        try {
            await client.connect();
            const db = client.db('database-name');
            const collection = db.collection('users');



            res.status(200).json({ message: 'Successfully Regitsered' });

        } catch(error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });

        } finally {
            await client.close();
        }
    }
);

app.post('api/login', async (req, res) => {
    const { username, password } = req.body;

        const client = new MongoClient(uri);
        try {
            await client.connect();
            const db = client.db('database-name');
            const collection = db.collection('users');



            res.status(200).json({ message: 'Login successful' });

        } catch(error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });

        } finally {
            await client.close();
        }
    }
);


// app.put("/", 
//         createProxyMiddleware({target: 'https://office-of-the-extension-services.000webhostapp.com/apiConnection', 
//         changeOrigin:true}),
//         (req, res) => {
//             console.log(res);
//         }
//     );

// app.delete("/", 
//     createProxyMiddleware({target: 'https://office-of-the-extension-services.000webhostapp.com/apiConnection', 
//     changeOrigin:true}),
//     (req, res) => {
//         console.log(res);
//     }
// );

app.listen(port, () => {
    console.log('Server running on port ${port}');
})