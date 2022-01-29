const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient } = require('mongodb');
const cors = require('cors');
app.use(cors());

const uri = `mongodb+srv://salescountConversations:u9Td2SmV7GeBiNeZ@cluster0.hmy6l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('myFirstDatabase');
        const dataCollection = await database.collection('salesCountConvertion');

        app.get('/total', async (req, res) => {
            const totalUser = dataCollection.find({});
            const total = await totalUser.toArray();
            const totalLength = { "length": total.length };
            res.send([totalLength]);
        });

    } catch {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Running");
});

app.listen(port, () => {
    console.log("Server is running at port", port);
});