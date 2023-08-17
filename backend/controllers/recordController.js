const Record = require("../models/recordModel");

// Create new record.
const addNewRecord = async (req, res) => {
    try{
        const record = await Record.create(req.body);
        res.status(200).json(record);
    }catch (err){
        res.status(500).send({message: err.message})
    }
};

// Get all the records.
const getRecords = async (req, res) => {	
    try{
        const recordList = await Record.find({});
        res.status(200).json(recordList);
    }catch (err){
        res.status(500).send({message: err.message})
    }
  };


// Get the record by id.
const getRecordById = async (req, res) => {	
    try {
        const {id} = req.params;
        const record = await Record.findById(id);
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({message: error.message})
    }	
};

// Update the record by id.
const updateRecord = async (req, res) => {	

    try {
        const {id} = req.params;
        const record = await Record.findOneAndUpdate({_id: id}, req.body);
        // we cannot find any record in database
        if(!record){
            return res.status(404).json({message: `cannot find any record with ID ${id}`})
        }
        const updatedRecord = await Record.findById(id);
        res.status(200).json(updatedRecord);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// Delete the record by id.
const deleteRecord = async (req, res) => {	
    try {
        const {id} = req.params;
        const record = await Record.findByIdAndRemove({_id: id});
        if(!record){
            return res.status(404).json({message: `cannot find any record with ID ${id}`})
        }
        res.status(200).json(record);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

module.exports = {
    addNewRecord,
    getRecords,
    getRecordById,
    updateRecord,
    deleteRecord
}