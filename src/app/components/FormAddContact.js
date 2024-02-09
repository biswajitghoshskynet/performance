'use client'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function FormAddContact() {
    const [mounted, setMounted] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
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

    const formHandle = async (e) => {
        e.preventDefault();
        await fetch(`${process.env.HOST}api/contact`, {
            cache: 'no-store',
            method: "POST",
            body: JSON.stringify({ name, email, dob, phonelist, addresslist, owner })
        }).then(() => {
            toast.success('Contact Added');
            setName('')
            setEmail('')
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
                        <form onSubmit={formHandle}>
                            <div className='mb-2'>
                                <input type="text" required value={name} className='form-control' id='name' name='name' placeholder='Name' onChange={(e) => { setName(e.target.value) }} />
                            </div>
                            <div className='mb-2'>
                                <input type="text" required className='form-control' value={email} id='email' name='email' placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
                            </div>

                            {phonelist.map((field, index) => (
                                <div className='mb-1' key={index}>
                                    <input type="phone" className='form-control' id='phone' required value={field.phone} name='phone' placeholder='phone' onChange={(e) => {
                                        const updatedFields = [...phonelist];
                                        updatedFields[index].phone = e.target.value;
                                        setPhonelist(updatedFields);
                                    }} />
                                </div>
                            ))}

                            <div className="d-grid gap-2 mb-2">
                                <button type='button' className='btn btn-info'  onClick={addPhone}><span className="material-icons-outlined">add_circle</span></button>
                            </div>

                            <div className='mb-2'>
                                <input type="text" className='form-control'  id='dob' value={dob} name='dob' placeholder='Date of Birth' onChange={(e) => { setDob(e.target.value) }} />
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
