const mongoose = require('mongoose');


//Create schema and model
const Schema = mongoose.Schema;

const ResidentSchema = new Schema({
    name: {
        type: String
    },
    ArrivalDate: {
        type: Date
    }
});

//const Resident = mongoose.model('resident', ResidentSchema);

module.exports = mongoose.model('Resident', ResidentSchema);




