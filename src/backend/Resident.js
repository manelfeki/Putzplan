const mongoose = require('mongoose');


//Create schema and model
const Schema = mongoose.Schema;

const ResidentSchema = new Schema({
    name: {
        type: String
    },
    phoneNumber: {
        type: String
    }
    // ArrivalDate: {
    //     type: Date
    // }
});


module.exports = mongoose.model('Resident', ResidentSchema);




