
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/dbconnect";
import { User } from "@/lib/models/user";



export async function POST(req) {
    
    const jwt = require('jsonwebtoken');
    const privateKey = process.env.JWT_KEY

    let data = []
    let loginuser = {}
    const payload = await req.json()
   
    try {
        await mongoose.connect(dbConnect)
        loginuser = await User.findOne({ email: payload.email })
      
        if (loginuser?.email === payload.email) {
            if (loginuser.password === payload.password) {
                let jwttoken = jwt.sign({ user: loginuser._id, iat: Math.floor(Date.now() / 1000) - 30 }, privateKey)
                data = { success: true, id: loginuser._id,  msg: `Welcome ${loginuser.name}`, token: jwttoken }
               
            }
            else {
                data = { success: false, msg: 'Wrong password' }
            }

        }
        else {
            data = { success: false, msg: 'User not exist' }
        }

    } catch (error) {
        data = { success: false }
    }
  
    return NextResponse.json(data)
}