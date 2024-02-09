import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbconnect";
import mongoose from "mongoose";
import { User } from "@/lib/models/user";

export async function GET(req, {params}) {
   
    let data = []
    
    try {
        await mongoose.connect(dbConnect)
        data = await User.find({ _id: params.id })
     
    } catch (error) {
        data = { success: false }
    }
     
    return NextResponse.json(data, req.header)
}