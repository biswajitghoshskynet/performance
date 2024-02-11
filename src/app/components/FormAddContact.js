'use client'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function FormAddContact() {
    const [mounted, setMounted] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState([''])
    const [dob, setDob] = useState('')
    const [phonelist, setPhonelist] = useState(
        [
            {
                phone: '',
                phonetype: ''
            },
        ]
    )
    const [addresslist, setAddresslist] = useState([])
    const [owner, setOwner] = useState()
    const [display, setDisplay] = useState(false)
    const handleDisplay = () => {
        setDisplay(true)
    }
    const handleDisplayClose = () => {
        setDisplay(false)
    }

    useEffect(() => {
        setMounted(true)
        let id = localStorage.getItem('userid')
        setOwner(id)
    }, [])

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
        await fetch(`${process.env.HOST}api/contact`, {
            cache: 'no-store',
            method: "POST",
            body: JSON.stringify({ name, email, dob, phonelist, addresslist, owner })
        }).then(() => {
            toast.success('Contact Added');
            setName('')
            setEmail([''])
            setPhonelist(
                [
                    {
                        phone: '',
                        phonetype: ''
                    },
                ]
            )
            setDob('')
        }).then(() => {
            setDisplay(false)
        })

    }

    return mounted && (
        <>
            <div className='d-flex justify-content-between'>
                <div><h1>Contact List</h1></div>
                <div><button type='button' onClick={handleDisplay} className='btn btn-primary'>Add</button></div>
            </div>
            {display === true ?
                <>
                    <div className='popOverlay' onClick={handleDisplayClose}></div>
                    <div className='popBox'>
                        <h2>Add Contact</h2>
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
                                            <button className="btn btn-outline-danger" type='button' onClick={
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
                                            <button type='button' className="btn btn-outline-primary" onClick={addEmail}><span className="material-icons-outlined">add</span></button>
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

                                            <button className="btn btn-outline-danger" type='button' onClick={
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
                                            <button type='button' className="btn btn-outline-primary" onClick={addPhone}><span className="material-icons-outlined">add</span></button>
                                        </div>
                                    </div>
                                ))}
                            </div>



                            <div className='mb-2'>
                                <input type="text" className='form-control' id='dob' value={dob} name='dob' placeholder='Date of Birth' onChange={(e) => { setDob(e.target.value) }} />
                            </div>
                            <div className='d-grid gap-2'>
                                <button type='submit' className='btn btn-success'>Add</button>
                            </div>
                        </form>
                    </div>
                </>
                : null}

            <ToastContainer />
        </>
    )
}
