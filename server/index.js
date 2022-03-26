require('dotenv').config();
const express = require('express');
const path = require('path');
const PORT = 3000;
const Liste = require('./data/travelList');
const app = express();
const recordRoutes = express.Router();

//----------------------------------//
//----------DB CONNECTION ----------//
//----------------------------------//
const mongoose = require('mongoose');
const url = process.env.ATLAS_URL;
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.listen(PORT, () => {
    console.log(`Server launch on port : ${PORT}`);
});
//----------------------------------//
//----------------------------------//

// Config express
const distDir = '../src/';
app.use('/pages', express.static(path.join(__dirname, distDir, '/pages')));
app.use('/assets', express.static(path.join(__dirname, distDir, '/assets')));
app.use(express.json());


// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, distDir, 'index.html'));
});

app.get('/liste', (req, res) => {
    res.sendFile(path.join(__dirname, distDir, 'pages/', 'listTravel.html'));
});

app.get('/formulaire', (req, res) => {
    res.sendFile(path.join(__dirname, distDir, 'pages/', 'travelForm.html'));
});

app.get('/formulaire/:id', (req, res) => {
    const paramsId = req.params.id;
    const itemFound = Liste.filter(elt => elt.id == paramsId);
    res.send(itemFound);
});

recordRoutes.route("/listTravel").get((req, res) => {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection("listingsAndReviews")
        .find({}).limit(50)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching listings!");
            } else {
                res.json(result);
            }
        });
});

app.post('/addTravel', (req, res) => {
    res.send('Ajouter');
});

app.patch('/updateTravel', (req, res) => {

    const findListe = Liste.find((elt) => req.body.id === elt.id);

    findListe.name = req.body.destination;
    findListe.img = req.body.image;
    findListe.description = req.body.description;

    res.send(findListe);
});
