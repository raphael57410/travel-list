const express = require('express');
const path = require('path');
const PORT = 3000;
const Liste = require('./data/travelList');

const app = express();

app.listen(PORT, () => {
    console.log(`Server launch on port : ${PORT}`);
});

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

app.get('/listTravel', (req, res) => {
    res.send(Liste);
});

app.post('/addTravel', (req, res) => {
    res.send('Ajouter');
});
