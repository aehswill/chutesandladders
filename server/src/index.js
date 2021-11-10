const app = require('./app');
const mongoose = require('mongoose');

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   /* eslint-disable no-console */
//   console.log(`Listening: http://localhost:${port}`);
//   /* eslint-enable no-console */
// });

const CONNECTION_URL = "mongodb://chutesandladders:EQmOXQCXb9JPxYe1tAEMg6H1471fiCcTGr0Jot4VniG0OX4Kye4T3dWnrTMfZDj3IG20asYQSqJ8hXUryWty2g==@chutesandladders.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@chutesandladders@";

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => app.listen(PORT, () => {
    console.log(`Connection is established and running on port: ${PORT}`);
})).catch((err) => {
    console.log(err);
});
