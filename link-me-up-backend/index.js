const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();


mongoose.connect(process.env.DB_URL,{
}).then(() => {
    app.listen(9002, () => {
        console.log("Server is connected and Connected to MongoDB");
    })
}).catch(error => {
    console.log("Unable to connect Server and/or MongoDB", error);
});

//Default Route
app.get("/", (request, response) => {
    response.json("Backend is working")
})

// Provider Routes
const ProviderRouter = require("./routes/ProviderRoutes")
app.use("/Provider", ProviderRouter)


//Admin Routes
const AdminRouter = require("./routes/AdminRoutes")
app.use("/Admin", AdminRouter)

//Package Routes
const PackageRouter = require("./routes/PackagesRoutes");
app.use("/Package", PackageRouter)

//Consumer Routes
const ConsumerRouter = require("./routes/ConsumerRoutes")
app.use("/Consumer", ConsumerRouter)

//Cart Routes
const CartRouter = require("./routes/CartRoutes")
app.use("/Cart", CartRouter)