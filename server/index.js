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

app.get('/formulaire', (req, res) => {
    console.log('la');
    res.sendFile(path.join(__dirname, distDir, 'travelForm.html'));
});

app.post('/addTravel', (req, res) => {
    res.send('Ajouter');
});
