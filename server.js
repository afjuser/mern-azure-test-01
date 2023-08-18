const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const path = require("path");

const Record = require("./backend/models/recordModel");

const app = express();

require("dotenv").config({ path: "./backend/config.env" });
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

// production script
/*app.use(express.static("./frontend/build"));
app.get("/portal", (req, res) => {
	res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
});
*/
app.use(express.static("./frontend/build"));
app.get("/portal/", function (_, res) {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
app.get("/portal/*", function (_, res) {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

/*const publicPath = express.static(path.join(__dirname, "../risc-portal/public"), { redirect : false });
const indexPath = path.join(__dirname, "../risc-portal/public", "index.html");

app.use("/portal", publicPath);
app.get("/portal/", function (_, res) {
    res.sendFile(indexPath);
});
app.get("/portal/*", function (_, res) {
    res.sendFile(indexPath);
});*/

app.get("/api/record", async (req, res) => {	
    try{
        const recordList = await Record.find({});
        res.status(200).json(recordList);
    }catch (err){
        res.status(500).send({message: err.message})
    }
  });
 
// routes setup
app.use(require("./backend/routes/recordRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});