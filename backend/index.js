const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const path = require("path");

const app = express();

require("dotenv").config();
const port = process.env.PORT || 5000;

// mongo connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    retryWrites: false
 })
 .then(() => console.log('Connection to CosmosDB successful'))
 .catch((err) => console.error(err));

// bodyparser setup
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json())

// cors setup
app.use(cors());

app.use(express.json());

// frontend webpack
const publicPath = express.static(path.join(__dirname, "../frontend/public"), { redirect : false });
const indexPath = path.join(__dirname, "../frontend/public", "index.html");

app.use("/portal", publicPath);
app.get("/portal/", function (_, res) {
    res.sendFile(indexPath);
});
app.get("/portal/*", function (_, res) {
    res.sendFile(indexPath);
});

// routes setup
app.use(require("./routes/recordRoutes"));
 
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});