import mongoose, { Schema } from "mongoose";
const contactModel = new mongoose.Schema(
   {
      photo: {
         type: String,
      },
      name: {
         prefix:{
            type: String,
            
         },
         name: {
            type: String,
            required: [true, 'is required.'],
            lowercase: true
         },
         suffix: {
            type: String,
         }
         
      },
      organization: {
         company: {
            type: String,
         },
         jobtitle: {
            type: String
         },
         department: {
            type: String
         }

      },
      email: [
         {
            email: {
               type: String,
            },
            emailtype: {
               type: String
            }
         }
      ],
      phonelist: [
         {
            countrycode:{
               type: String,
            },
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
            country: {
               type: String
            },
            street: {
               type: String
            },
            city: {
               type: String
            },
            pincode: {
               type: String
            },
            pobox: {
               type: String
            },
            addresstype: {
               type: String
            }
         }
      ],
      dob: {
         type: String,
      },
      notes: {
         type: String
      },
      label: {
         type: String
      },
      favourite: {
         type: Boolean,
         default: false
      },
      owner: {
         type: mongoose.Types.ObjectId,
         ref: "User"
      }
      

   }, { timestamps: true })

export const Contact = mongoose.models.Contact || mongoose.model("Contact", contactModel);