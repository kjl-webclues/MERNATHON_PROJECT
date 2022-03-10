const mongoose = require('mongoose')

//===========================Connection Request ============================
const DB = process.env.DATABASE

//===========================Connection With Databse ============================
mongoose.connect("mongodb://localhost/NFTData")
    .then(() => console.log("Databse Connected"))
    .catch((error) => console.log(error))
