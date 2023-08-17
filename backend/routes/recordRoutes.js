const {
    addNewRecord, 
    getRecords, 
    getRecordById,
    updateRecord,
    deleteRecord
} = require("../controllers/recordController");
const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();


// Get all records
recordRoutes.route("/api/record").get(getRecords);

// Add new record to the database
recordRoutes.route("/api/record/add").post(addNewRecord);

// Get record by Id
recordRoutes.route("/api/record/:id").get(getRecordById);

// Update record by Id
recordRoutes.route("/api/update/:id").put(updateRecord);

// Delete record by Id
recordRoutes.route("/api/:id").delete(deleteRecord);

module.exports = recordRoutes;