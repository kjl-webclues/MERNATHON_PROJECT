const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();

//===========================CONFIG FILE PATH===========================//
dotenv.config({ path: './config.env' })

//===========================DATABASE CONNECTION PATH===========================//
require('./database/connection')

app.use(cookieParser());

//===========================Middleware ===========================//
app.use(express.json());

//===========================Create Route ===========================//
app.use(require('./Router/routes'));

//===========================Listing Server ==========================//
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is Listining on Port ${PORT}`);
})



