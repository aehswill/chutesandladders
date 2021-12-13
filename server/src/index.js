const app = require('./app');
var mongoose = require('mongoose');
var env = require('dotenv').config();

/**
 * set connection string and connect to the database
 */
const CONNECTION_URL = 'mongodb+srv://user:user@puzzlingpipestest.ezifi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => app.listen(PORT, () => {
    console.log(`Connection is established and running on port: ${PORT}`);
})).catch((err) => {
    console.log(err);
});