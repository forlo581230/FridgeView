var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var fridgeSchema = new Schema({
    date:String,
    reader_mac:String,
    rfid_mac:String,
    job_number:String,
    model:String,
    lot:String,
    target:String,
    amount:String
});

fridgeSchema.methods.check = function(){
    return (this.date + this.reader_mac + this.rfid_mac + this.job_number + this.model + this.lot + this.target + this.amount).indexOf('undefined');
}

// var Fridge = mongoose.model('data', fridgeSchema);


module.exports = fridgeSchema;