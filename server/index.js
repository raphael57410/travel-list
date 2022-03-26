require('dotenv').config();
const express = require('express');
require('./db/db.js');
const path = require('path');
const PORT = 3000;
const app = express();
const TravelModel = require('./models/travelModel');


app.listen(PORT, () => {
    console.log(`Server launch on port : ${PORT}`);
});

// Config express
const distDir = '../src/';
app.use('/pages', express.static(path.join(__dirname, distDir, '/pages')));
app.use('/assets', express.static(path.join(__dirname, distDir, '/assets')));
app.use(express.json());


// Template Router
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, distDir, 'index.html'));
});

app.get('/liste', (req, res) => {
    res.sendFile(path.join(__dirname, distDir, 'pages/', 'listTravel.html'));
});

app.get('/formulaire', (req, res) => {
    res.sendFile(path.join(__dirname, distDir, 'pages/', 'travelForm.html'));
});

// Data router
app.get('/formulaire/:id', (req, res) => {
    const paramsId = req.params.id;

    TravelModel.findById(paramsId, (err, doc) => {
        res.send(doc);
    });
});

// all travel
app.get('/listTravel', (req, res) => {
    TravelModel.find({})
        .then((doc) => {
            res.send(doc);
        })
});

// add travel
app.post('/addTravel', async (req, res) => {
    const { destination, image, description } = req.body;
    let newTravel = {};
    newTravel.name = destination;
    newTravel.img = image;
    newTravel.description = description;

    let travelModel = new TravelModel(newTravel);

    await travelModel.save();

    res.json(travelModel);

});

// update travel
app.patch('/updateTravel', (req, res) => {

    TravelModel.findById(req.body.id, (err, doc) => {

        doc.name = req.body.destination;
        doc.img = req.body.image;
        doc.description = req.body.description;
        doc.save();
        res.send(doc);
    });
});
