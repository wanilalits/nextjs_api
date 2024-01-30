import { connectionStr } from "@/lib/db";
import { Log } from "@/lib/modal/log";
import mongoose from "mongoose";
import { NextResponse } from "next/server";






export async function GET (request, content){
  let result1=(content.params.req[1])
  // const payload =await result.json();
  await mongoose.connect(connectionStr);
  let log =new Log ({firstname:result1})
   const result =await log.save();
    return NextResponse.json({sucss:true, result1 })
  }



export async function POST (request, content){
   // const payload =await result.json();
   await mongoose.connect(connectionStr);
   let log =new Log ({firstname:content.params.req[1]})
    const result =await log.save();
  

      return NextResponse.json({sucss:true, result  })
  }

