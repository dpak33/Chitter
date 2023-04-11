const express = require('express');
require('dotenv').config()


const app = express();
app.use(express.json());

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const peepRoute = require("./routes/peep");

const mongodbConnection = require('./config/mongodbConnection');
const port = 8000;

//So below we're saying that for every request that comes in to the below endpoint, we are going to run the checking in 
//our routes/auth path that we've imported above. 
app.use('/api/auth', authRoute);
app.use('/api/peep', peepRoute);
app.use('/api/user', userRoute);

app.listen(port, () => console.log(`Node JS server running on port ${port}!`));

module.exports = app;