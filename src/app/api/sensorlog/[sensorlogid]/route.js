import { connectionStr, count } from "@/lib/db";
import { Log } from "@/lib/modal/log";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
//http://localhost:3000/api/sensorlog/65c05fe54bd55b901042f72f,dgsd,fdjh,nfdj,djdt





export async function GET (request, content){
  
 
    const text = content.params.sensorlogid.toString();
    
       
     const myArray = text.split(",");
    
        
    
         
  
       var currentdate = new Date(); 
       currentdate.setHours(currentdate.getHours() + 5);
       currentdate.setMinutes(currentdate.getMinutes() + 30);   
       let newcurrentdate=currentdate.getHours() +":"+ currentdate.getMinutes()+":"+currentdate.getSeconds() +" "+ currentdate.getDate() +"-"+ (currentdate.getMonth() +1) +"-"+ currentdate.getFullYear()

       const logId =myArray[0];
       const filter = {_id:logId}
           
       const payload = {
        firstname: myArray[1],
          lastname: myArray[2],
           address: myArray[3],
           time: newcurrentdate,
            }
           // console.log(payload);
         await mongoose.connect(connectionStr);
         const result = await Log.findOneAndUpdate(filter, payload)
         //console.log(content)
         //console.log(request);
         //console.log(payload); 
     
         return NextResponse.json({ payload, sucess:true})

    
}
