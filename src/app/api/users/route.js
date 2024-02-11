import { NextResponse } from "next/server";
import { User } from "../../../lib/models/user"
import { dbConnect } from "../../../lib/dbconnect"
import mongoose from "mongoose";
import { Contact } from "@/lib/models/contact";


export async function GET(req) {
    const jwt = require('jsonwebtoken');
    const privateKey = process.env.JWT_KEY

    let data = []
    try {
        let token = await req.headers.get('authorization')

        if (jwt.verify(token, privateKey)) {
            await mongoose.connect(dbConnect)
            data = await User.find()
            data = { success: true, data }
        }
        else {
            data = { success: false, msg: 'Authorization failed ' }
        }

    } catch (error) {
        data = { success: false }
    }

    return NextResponse.json(data)
}

export async function POST(req) {
    let result = null
    const payload = await req.json()
    try {
        await mongoose.connect(dbConnect)
        let userVerefy = await User.findOne({ email: payload.email })

        if (userVerefy?.email == payload.email) {
            result = { success: false, message: 'User already exist' }
        }
        else {
            let newUser = new User(payload)
            let data = await newUser.save()
            result = { success: true, status: 201, data: data }
        }

    } catch (error) {
        result = { success: false, error }
    }

    return NextResponse.json(result, { status: 201 })
}