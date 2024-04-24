const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON body
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Route to handle root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Mock questions data (replace this with your actual data)
const questions = require('./questions.json');

// Route to get questions
app.get('/api/questions', (req, res) => {
    res.json(questions);
});

// Route to serve cinema.html
app.get('/cinema', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cinema.html'));
});

// Route to serve jeux-video.html
app.get('/jeux-video', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'jeux_video.html'));
});

// Route to serve automobile.html
app.get('/automobile', (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'automobile.html'))
);

// Route to serve images from assets directory
app.get('/assets/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.sendFile(path.join(__dirname, 'assets', imageName));
});


app.get('/result', (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'result.html'))
);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
