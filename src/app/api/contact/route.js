import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/dbconnect";
import { User } from "../../../lib/models/user"
import { Contact } from "../../../lib/models/contact"

export async function GET(req) {
    const jwt = require('jsonwebtoken');
    const privateKey = process.env.JWT_KEY
    let data = {}
    try {
        let token = await req.headers.get('authorization')
        let finalToken = await jwt.verify(token, privateKey)

        if (jwt.verify(token, privateKey)) {

            await mongoose.connect(dbConnect)
            data = await User.find({ _id: finalToken.user }).populate({
                path: "contact",
            })
            data = data[0].contact
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
    let data = {}
    let payload = await req.json()
    try {
        await mongoose.connect(dbConnect)
        let newContact = new Contact(payload)
        data = await newContact.save()
        let user = await User.findOne({ _id: payload.owner })
        user.contact.push(newContact._id)
        await user.save()

    } catch (error) {
        console.log(error);
    }
    return NextResponse.json(data)
}




