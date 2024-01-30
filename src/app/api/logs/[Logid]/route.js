import { connectionStr } from "@/lib/db";
import { Log } from "@/lib/modal/log";
import mongoose from "mongoose";
import { NextResponse } from "next/server";




export async function PUT (request, content){
    const logId =content.params.Logid;
    const filter = {_id:logId}
    const payload = await request.json();
    console.log(payload)
    await mongoose.connect(connectionStr);
 
    const result = await Log.findOneAndUpdate(filter,payload)
    //console.log(content)
    //console.log(request);
    //console.log(payload); 
    return NextResponse.json({payload, sucess:true})
}

export async function GET (request, content){
    const logId =content.params.Logid;
    const filter = {_id:logId}
    await mongoose.connect(connectionStr);
    const result = await Log.findById(filter)
  var total_entries = await Log.countDocuments({ firstname:"Lalit" });
  total_entries = await Log.countDocuments({  });
    //console.log(content)
    //console.log(content.params.logID +"OK");
    //console.log(payload); 
    return NextResponse.json({result, sucss:true, total_entries})
}

export async function DELETE (request, content){
    const logId =content.params.Logid;
    const filter = {_id:logId}
    await mongoose.connect(connectionStr);
    const result = await Log.deleteOne(filter)
    //console.log(content)
    //console.log(content.params.logID +"OK");
    //console.log(payload); 
    return NextResponse.json({result, sucess:true})
}