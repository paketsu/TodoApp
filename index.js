//Tämä kaikki on express-tapaa tehdä nodella

// External npm packages:
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const mongoose = require("mongoose")

//Connect to the database
async function connect() {
    mongoose.Promise = global.Promise;

    // establish Connection
    mongoose.connect(process.env.DATABASE, { 
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    mongoose.set('useCreateIndex', true);
    //Mongoose events
    //Successfull Connection
    mongoose.connection.on("connected", function() {
        console.log("Mongoose Connected to " + process.env.DATABASE);
    })
}

connect()

const express = require("express")

const app = express()

const bodyParser = require("body-parser")

const cors = require("cors")

const todoRoutes = require("./routes/todoroutes")

const errorHandler = require("./handlers/errorhandler")

app.use(cors())
app.set("port", process.env.PORT || 8080)
app.set("ip", "0.0.0.0")
app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log(req.url);
    next();
})

// Tehdään tämä tänne kerran, jolloin todoroutes.js -tiedostossa ei tarvitse enää erikseen spesifioida polkua
app.use("/api/todos", todoRoutes)

app.use(errorHandler)

app.listen(app.get("port"), app.get("ip"), () => {
    console.log("sovellus käynnistetty " + app.get("port") + " " + app.get("ip"))
})