const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const app = express();

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

// mongo connection
mongoose.Promise = global.Promise;
/*mongoose.connect("mongodb://0.0.0.0:27017/employees", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
 .then(() => console.log('Connection to CosmosDB successful'))
 .catch((err) => console.error(err));
;*/

// azure mongo connection
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

// routes setup
app.use(require("./routes/recordRoutes"));

// Get MongoDB driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // Perform a database connection when server starts
 // dbo.connectToServer(function (err) {
 //   if (err) console.error(err);
 
 // });
  console.log(`Server is running on port: ${port}`);
});