'use client'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function FormUpdateContact({ id }) {
    const [mounted, setMounted] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState([''])
    const [phonelist, setPhonelist] = useState(
        [
            {
                phone: '',
                phonetype: ''
            },

        ]
    )
    const [addresslist, setAddresslist] = useState([])
    const [dob, setDob] = useState('')
    let data = {}


    useEffect(() => {
        setMounted(true)
        getData()
    }, [])

    const getData = async () => {
        data = await fetch(`${process.env.HOST}api/contact/${id}`, {
            cache: 'no-store'
        })
        data = await data.json()
        if (data?.success === true) {
            setName(data.data.name)
            setEmail(data.data.email)
            setDob(data.data.dob)
            setPhonelist(data.data.phonelist)
        }
     

    }

    const addPhone = () => {
        const add = [...phonelist, {
            phone: '',
            phonetype: ''
        }]
        setPhonelist(add)
    }
    const addEmail = () => {
        const add = [...email, '']
        setEmail(add)
    }



    const formHandle = async (e) => {
        e.preventDefault();
        await fetch(`${process.env.HOST}api/contact/${id}`, {
            cache: 'no-store',
            method: "PUT",
            body: JSON.stringify({ name, email, dob, phonelist, addresslist })
        }).then(() => {
            toast.success('Update complete');

        })

    }

    return mounted && (
        <>
            <h2>Update Information</h2>

            <form onSubmit={formHandle}>
                <div className='mb-2'>
                    <input type="text" required value={name} className='form-control' id='name' name='name' placeholder='Name' onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div className='mb-2'>
                    {email.map((field, index) => (
                        <div className='mb-1' key={index}>
                            <div className="input-group">
                                <input type="text" required className='form-control' value={field} id='email' name='email' placeholder='Email' onChange={(e) => {
                                    const updatedFields = [...email];
                                    updatedFields[index] = e.target.value;
                                    setEmail(updatedFields);
                                }} />
                                
                                    <button class="btn btn-outline-danger" type='button' onClick={
                                        () => {

                                            if (email.length > 1) {
                                                let updatedFields = [...email];
                                                delete updatedFields[index]

                                                updatedFields = updatedFields.filter(function (element) {
                                                    return element !== undefined;
                                                });
                                                setEmail(updatedFields)
                                            }


                                        }
                                    }><span className="material-icons-outlined">delete</span></button>
                                   

                                <button type='button' class="btn btn-outline-primary" onClick={addEmail}><span className="material-icons-outlined">add</span></button>
                            </div>

                        </div>
                    ))}
                </div>
                <div className='mb-2'>
                    {phonelist.map((field, index) => (
                        <div className='mb-1' key={index}>
                            <div className="input-group">
                                <input type="phone" className='form-control' id='phone' required value={field.phone} name='phone' placeholder='phone' onChange={(e) => {
                                    const updatedFields = [...phonelist];
                                    updatedFields[index].phone = e.target.value;
                                    setPhonelist(updatedFields);
                                }} />
                                <select className="form-select" id="phoneType" value={field.phonetype} onChange={(e) => {
                                    const updatedFields = [...phonelist];
                                    updatedFields[index].phonetype = e.target.value;
                                    setPhonelist(updatedFields);
                                }}>
                                    <option>Choose...</option>
                                    <option value="Mobile">Mobile</option>
                                    <option value="Home">Home</option>
                                    <option value="Office">Office</option>
                                </select>

                                <button class="btn btn-outline-danger" type='button' onClick={
                                    () => {

                                        if (phonelist.length > 1) {
                                            let updatedFields = [...phonelist];
                                            delete updatedFields[index]

                                            updatedFields = updatedFields.filter(function (element) {
                                                return element !== undefined;
                                            });
                                            setPhonelist(updatedFields)
                                        }


                                    }
                                }><span className="material-icons-outlined">delete</span></button>
                                <button type='button' class="btn btn-outline-primary" onClick={addPhone}><span className="material-icons-outlined">add</span></button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='mb-2'>
                    <input type="text" className='form-control' id='dob' value={dob} name='dob' placeholder='Date of Birth' onChange={(e) => { setDob(e.target.value) }} />
                </div>
                <div className='d-grid gap-2'>
                    <button type='submit' className='btn btn-success'>Update</button>
                </div>
            </form>

            <ToastContainer />
        </>
    )
}
