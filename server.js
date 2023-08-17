const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

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

// routes setup
app.use(require("./backend/routes/recordRoutes"));

// production script
app.use(express.static("./frontend/build"));
app.get("*", (req, res) => {
	res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"))
});
 
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});