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
   
    var currentdate = new Date(); 
    function addHours(date, hours) {
        date.setHours(currentdate.getHours() + hours);
        date.setMinutes(currentdate.getMinutes() + 30);
        return currentdate;
      }
      const newDate = addHours(currentdate, 5);

 payload['time'] = newDate;

    console.log(payload)
    await mongoose.connect(connectionStr);
    let log =new Log (payload)
    const result =await log.save();
    return NextResponse.json({result,sucess:true})
}
