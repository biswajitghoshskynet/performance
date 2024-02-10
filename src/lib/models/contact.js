import mongoose, { Schema } from "mongoose";
const contactModel = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'is required.'],
      },
      email: [
         {
            type: String
         }
      ],
      phonelist: [
         {
            phone: {
               type: Number,
            },
            phonetype: {
               type: String
            }
         }
      ],
      addresslist: [
         {
            address: {
               type: String
            }
         }
      ],
      dob: {
         type: String,
      },
      owner: {
         type: mongoose.Types.ObjectId,
         ref: "User"
      }

   }, { timestamps: true })

export const Contact = mongoose.models.Contact || mongoose.model("Contact", contactModel);