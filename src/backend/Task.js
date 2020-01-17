const mongoose = require('mongoose');


//Create schema and model
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    assignedresident: {
        type: mongoose.Schema.Types.ObjectId
    },
    isdone: {
        type: Boolean
    },
    startdate: {
        type: Date
    },
    enddate: {
        type: Date
    }

});


module.exports = mongoose.model('Task', TaskSchema);