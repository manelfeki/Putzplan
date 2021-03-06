const mongoose = require('mongoose');
var Resident = require('./Resident');

//Create schema and model
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    description: {
        type: String
    },
    // in non repeatable task : AssignedResident is the the only resident
    //in repeatable task : AssignedResident is the current Resident 
    assignedResident: {
        type: mongoose.Schema.Types.ObjectId
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    isRepeating: {
        type: Boolean
    },
    index: {
        type: Number,
        default: 0
    },
    taskStatus: {
        type: String
    },
    occurence: {
        type: Number
    }

});


module.exports = mongoose.model('Task', TaskSchema);
