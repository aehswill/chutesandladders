const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' })

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   /* eslint-disable no-console */
//   console.log(`Listening: http://localhost:${port}`);
//   /* eslint-enable no-console */
// });


const CONNECTION_URL = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@chutesandladders.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@chutesandladders@`;


const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => app.listen(PORT, () => {
    console.log(`Connection is established and running on port: ${PORT}`);
})).catch((err) => {
    console.log(err);
});
