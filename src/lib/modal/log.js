import mongoose  from "mongoose"
const logModel=new mongoose.Schema({
    firstname:String,
    lastname:String,
    address:String,
    time:String,
});
export const Log = mongoose.models.logs|| mongoose.model('logs',logModel);
