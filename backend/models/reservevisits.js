const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema


const reservevisitsSchema = new mongoose.Schema({
    name:{type:String},
    present:{type:Boolean},
    todayPresent:{type:Boolean},
    dailSent:{type:Boolean},
    shamapOpen:{type:Boolean},
    subject:{type:String},
    details:{type:String},
    unit:{type:String},
});

const Reservevisits = mongoose.model('Reservevisits', reservevisitsSchema);


module.exports = Reservevisits;