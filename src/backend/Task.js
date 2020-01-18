const mongoose = require('mongoose');


//Create schema and model
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    description: {
        type: String
    },
    assignedResident: {
        type: mongoose.Schema.Types.ObjectId
    },
    isDone: {
        type: Boolean
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    }

});


module.exports = mongoose.model('Task', TaskSchema);