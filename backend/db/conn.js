const { MongoClient } = require("mongodb");
const Db = process.env.LOCAL_URI;

var _db;

const P = require("bluebird");
const mongo = P.promisifyAll(require("mongodb"));

module.exports = {
  connectToServer: async function (callback) {
    
      const client = await mongo.MongoClient.connect(Db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const db = client.db("employees");
      if (db)
      {
        _db = client.db("employees");
        console.log("Successfully connected to MongoDB."); 
      }
  },
 
  getDb: function () {
    return _db;
  },
};