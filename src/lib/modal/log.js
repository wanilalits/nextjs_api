import mongoose  from "mongoose"
const logModel=new mongoose.Schema({
    firstname:String,
    lastname:String,
    address:String,
});
export const Log = mongoose.models.logs|| mongoose.model('logs',logModel);
