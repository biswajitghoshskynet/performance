import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/dbconnect";
import { User } from "@/lib/models/user"
import { Contact } from "@/lib/models/contact"


export async function GET(req, content){
    let data = {}
    let contactId = await content.params.id
    try {
       await mongoose.connect(dbConnect)
        data = await Contact.findOne({ _id: contactId })
        data = {success: true, data}
    } catch (error) {
        data = error
        data = {success: false, data}
    }
    return NextResponse.json(data)
}

export async function PUT(req, content){
    let data = {}
    let contactId = await content.params.id
    
    try {
        await mongoose.connect(dbConnect)
        let payload = await req.json()
  
        data = await Contact.findOneAndUpdate({_id: contactId}, payload)
        data = await data.save()
        data = {success: true, data} 
    } catch (error) {
        data = {success: false, data}
    }
     return NextResponse.json(data)
}

export async function DELETE(req, content) {
    let data = {}
    let contactId = await content.params.id
    let token = await req.headers.get('authorization')
   
    try {
        await mongoose.connect(dbConnect)
        data = await Contact.deleteOne({ _id: contactId })
        let user = await User.findOne({ _id: token })
        let itemIndex = user.contact.indexOf(contactId)
        delete user.contact[itemIndex]
        let newArr = [...user.contact]
        newArr = newArr.filter(function (element) {
            return element !== undefined;
        });
        user.contact = newArr
        await user.save()

    } catch (error) {
        console.log(error);
    }
    return NextResponse.json(data)
}