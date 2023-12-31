// Create web server
// 1. npm init
// 2. npm install express --save
// 3. npm install body-parser --save
// 4. npm install mongoose --save
// 5. npm install nodemon --save
// 6. npm install cors --save
// 7. npm install --save-dev nodemon
// 8. npm start

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Cross-origin resource sharing

// Create express app
const app = express();

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./config/database.config.js');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connected to the database');
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Enable CORS for all requests
app.use(cors());

// Define a simple route
app.get('/', (req, res) => {
    res.json({ 'message': 'Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.' });
});

// Require Notes routes
require('./app/routes/note.routes.js')(app);

// Listen for requests
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});