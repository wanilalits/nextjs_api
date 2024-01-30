import {connectionStr,data} from '@/lib/db';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import {Log}from '@/lib/modal/log'
export async function GET(){
    let data =[];
try{

    await mongoose.connect(connectionStr);
   data=await Log.find();
    var total_entries = await Log.countDocuments();
    total_entries = await Log.countDocuments({  });
}
catch (error)
{
data =['nodata found']
}
return NextResponse.json({result:data, sucese:true, total_entries})

}

export async function POST (request){
    const payload =await request.json();

 
    //var newNum = "3";
    //var newVal = "cc";
    //payload[newNum] = newVal;
  
    var currentdate = new Date(); 
    var datetime =  currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " " 
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    payload['time'] = datetime;

    console.log(payload)
    await mongoose.connect(connectionStr);
    let log =new Log (payload)
    const result =await log.save();
    return NextResponse.json({result,sucess:true})
}
