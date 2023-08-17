const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
	name: {
        type: String, 
        required: true	
    },
    position: {
        type: String, 	
    },
    level: {
        type: String, 	
    },
},
{
    timestamps: true
});

const Record = mongoose.model('records', RecordSchema);

module.exports = Record;