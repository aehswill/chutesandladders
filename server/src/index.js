const app = require('./app');
var mongoose = require('mongoose');
var env = require('dotenv').config();

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   /* eslint-disable no-console */
//   console.log(`Listening: http://localhost:${port}`);
//   /* eslint-enable no-console */
// });


const CONNECTION_URL = 'mongodb+srv://user:user@puzzlingpipestest.ezifi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// const CONNECTION_URL = `${process.env.COSMOSDB_CONNECTION_STRING}`;
// console.log(CONNECTION_URL);
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => app.listen(PORT, () => {
    console.log(`Connection is established and running on port: ${PORT}`);
})).catch((err) => {
    console.log(err);
});

// mongoose.connect("mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb", {
//    auth: {
//      username: process.env.COSMOSDB_USER,
//      password: process.env.COSMOSDB_PASSWORD
//    },
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
//  retryWrites: false
//  })
//  .then(() => console.log(`Connection to CosmosDB successful and running on port: ${PORT}`))
//  .catch((err) => console.error(err));
