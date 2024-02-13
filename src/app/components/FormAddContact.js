'use client'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function FormAddContact() {
    const [mounted, setMounted] = useState(false);
    const [display, setDisplay] = useState(false)


    const [photo, setPhoto] = useState('')
    const [name, setName] = useState(
        {
            prefix: '',
            name: '',
            suffix: ''
        }
    )
    const [organization, setOrganization] = useState(
        {
            company: '',
            jobtitle: '',
            department: ''
        }
    )
    const [email, setEmail] = useState(
        [
            {
                email: '',
                emailtype: ''
            }
        ]
    )
    const [phonelist, setPhonelist] = useState(
        [
            {
                countrycode: '',
                phone: '',
                phonetype: ''
            },
        ]
    )
    const [addresslist, setAddresslist] = useState(
        [
            {
                country: '',
                street: '',
                city: '',
                pincode: '',
                pobox: '',
                addresstype: ''
            }
        ]
    )
    const [dob, setDob] = useState('')
    const [notes, setNotes] = useState('')
    const [label, setLebel] = useState('')
    const [owner, setOwner] = useState()


    useEffect(() => {
        setMounted(true)
        let id = localStorage.getItem('userid')
        setOwner(id)
    }, [])

    const addPhone = () => {
        const add = [...phonelist, {
            countrycode: '',
            phone: '',
            phonetype: ''
        }]
        setPhonelist(add)
    }
    const addEmail = () => {
        const add = [...email,
        {
            email: '',
            emailtype: ''
        }
        ]
        setEmail(add)
    }
    const addAddress = () => {
        const add = [...addresslist,
        {
            country: '',
            street: '',
            city: '',
            pincode: '',
            pobox: '',
            addresstype: ''
        }]
        setAddresslist(add)
    }

    const formHandle = async (e) => {
        e.preventDefault();
        await fetch(`${process.env.HOST}api/contact`, {
            cache: 'no-store',
            method: "POST",
            body: JSON.stringify({ photo, name, organization, email, phonelist, addresslist, dob, notes, label, owner })
        }).then(() => {
            toast.success('Contact Added');
            setPhoto('')
            setName(
                {
                    prefix: '',
                    name: '',
                    suffix: ''
                }
            )
            setOrganization(
                {
                    company: '',
                    jobtitle: '',
                    department: ''
                }
            )
            setEmail(
                [
                    {
                        email: '',
                        emailtype: ''
                    }
                ]
            )
            setPhonelist(
                [
                    {
                        countrycode: '',
                        phone: '',
                        phonetype: ''
                    },
                ]
            )
            setAddresslist(
                [
                    {
                        country: '',
                        street: '',
                        city: '',
                        pincode: '',
                        pobox: '',
                        addresstype: ''
                    }
                ]
            )

            setDob('')
            setNotes('')
            setLebel('')
        }).then(() => {
            setDisplay(false)
        })

    }

    const handleDisplay = () => {
        setDisplay(true)
    }
    const handleDisplayClose = () => {
        setDisplay(false)
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
                            {/* photo */}
                            <div className='mb-2'><input type="text" value={photo} className='form-control' id='photo' name='photo' placeholder='Photo' onChange={(e) => { setPhoto(e.target.value) }} /></div>

                            {/* name */}
                            <div className='mb-2'>
                                <div className='row gx-2'>
                                    <div className='col-md-3'>
                                        <input type="text" value={name.prefix} className='form-control'
                                            id='prefix' name='prefix' placeholder='Prefix'
                                            onChange={(e) => {
                                                let value = { ...name }
                                                value.prefix = e.target.value
                                                setName(value)
                                            }} />
                                    </div>
                                    <div className='col-md-6'>
                                        <input type="text" required value={name.name} className='form-control'
                                            id='name' name='name' placeholder='Name'
                                            onChange={(e) => {
                                                let value = { ...name }
                                                value.name = e.target.value
                                                setName(value)
                                            }} />
                                    </div>
                                    <div className='col-md-3'>
                                        <input type="text" value={name.suffix} className='form-control'
                                            id='suffix' name='suffix' placeholder='Suffix'
                                            onChange={(e) => {
                                                let value = { ...name }
                                                value.suffix = e.target.value
                                                setName(value)
                                            }} />
                                    </div>
                                </div>
                            </div>

                            {/* organization */}
                            <div className='mb-2'>
                                <h4 className='mb-1'>Organization</h4>
                                <div className='row gx-2'>
                                    <div className='col-md-4'>
                                        <input type="text" value={organization.company} className='form-control'
                                            id='company' name='company' placeholder='Company'
                                            onChange={(e) => {
                                                let value = { ...organization }
                                                value.company = e.target.value
                                                setOrganization(value)
                                            }} />
                                    </div>
                                    <div className='col-md-4'>
                                        <input type="text" value={organization.jobtitle} className='form-control'
                                            id='jobtitle' name='jobtitle' placeholder='Job Title'
                                            onChange={(e) => {
                                                let value = { ...organization }
                                                value.jobtitle = e.target.value
                                                setOrganization(value)
                                            }} />
                                    </div>
                                    <div className='col-md-4'>
                                        <input type="text" value={organization.department} className='form-control'
                                            id='department' name='department' placeholder='Department'
                                            onChange={(e) => {
                                                let value = { ...organization }
                                                value.department = e.target.value
                                                setOrganization(value)
                                            }} />
                                    </div>
                                </div>
                            </div>

                            {/* email */}
                            <div className='mb-2'>
                                <h4 className='mb-1'>Email</h4>
                                {email.map((field, index) => (
                                    <div className='mb-1' key={index}>
                                        <div className="input-group">
                                            <input type="text" required className='form-control' value={field.email} id='email' name='email' placeholder='Email' onChange={(e) => {
                                                let value = [...email];
                                                value[index].email = e.target.value;
                                                setEmail(value);
                                            }} />

                                            <select className="form-select" id="emailtype" value={field.emailtype} onChange={(e) => {
                                                let value = [...email];
                                                value[index].emailtype = e.target.value;
                                                setEmail(value);
                                            }}>
                                                <option>Label...</option>
                                                <option value="Personal">Personal</option>
                                                <option value="Home">Home</option>
                                                <option value="Office">Office</option>
                                            </select>
                                            <button className="btn btn-outline-danger" type='button' onClick={
                                                () => {

                                                    if (email.length > 1) {
                                                        let value = [...email];
                                                        delete value[index]

                                                        value = value.filter(function (element) {
                                                            return element !== undefined;
                                                        });
                                                        setEmail(value)
                                                    }
                                                }
                                            }><span className="material-icons-outlined">delete</span></button>
                                            <button type='button' className="btn btn-outline-primary" onClick={addEmail}><span className="material-icons-outlined">add</span></button>
                                        </div>

                                    </div>
                                ))}
                            </div>

                            {/* phone */}
                            <div className='mb-2'>
                                <h4 className='mb-1'>Phone</h4>
                                {phonelist.map((field, index) => (
                                    <div className='mb-1' key={index}>
                                        <div className="input-group">
                                            <input type="phone" className='form-control' id='countrycode' required value={field.countrycode} name='countrycode' placeholder='Countrycode' onChange={(e) => {
                                                let value = [...phonelist];
                                                value[index].countrycode = e.target.value;
                                                setPhonelist(value);
                                            }} />
                                            <input type="phone" className='form-control' id='phone' required value={field.phone} name='phone' placeholder='Phone' onChange={(e) => {
                                                let value = [...phonelist];
                                                value[index].phone = e.target.value;
                                                setPhonelist(value);
                                            }} />
                                            <select className="form-select" id="phoneType" value={field.phonetype} onChange={(e) => {
                                                let value = [...phonelist];
                                                value[index].phonetype = e.target.value;
                                                setPhonelist(value);
                                            }}>
                                                <option>Label...</option>
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

                            {/* address */}
                            <div className='mb-2'>
                                <h4 className='mb-1'>Address</h4>
                                {addresslist.map((field, index) => (
                                    <div className='row gx-2 mb-2' key={index}>
                                        <div className='col-md-6 mb-1'>
                                            <input type="text" className='form-control' id='country' value={field.country} name='country' placeholder='Country' onChange={(e) => {
                                                let value = [...addresslist];
                                                value[index].country = e.target.value;
                                                setAddresslist(value);
                                            }} />
                                        </div>
                                        <div className='col-md-6 mb-1'>
                                            <input type="text" className='form-control' id='street' value={field.street} name='street' placeholder='Street' onChange={(e) => {
                                                let value = [...addresslist];
                                                value[index].street = e.target.value;
                                                setAddresslist(value);
                                            }} />
                                        </div>
                                        <div className='col-md-6 mb-1'>
                                            <input type="text" className='form-control' id='city' value={field.city} name='city' placeholder='City' onChange={(e) => {
                                                let value = [...addresslist];
                                                value[index].city = e.target.value;
                                                setAddresslist(value);
                                            }} />
                                        </div>
                                        <div className='col-md-6 mb-1'>
                                            <input type="text" className='form-control' id='pincode' value={field.pincode} name='pincode' placeholder='Pincode' onChange={(e) => {
                                                let value = [...addresslist];
                                                value[index].pincode = e.target.value;
                                                setAddresslist(value);
                                            }} />
                                        </div>
                                        <div className='col-md-6 mb-1'>
                                            <input type="text" className='form-control' id='pobox' value={field.pobox} name='pobox' placeholder='PO Box' onChange={(e) => {
                                                let value = [...addresslist];
                                                value[index].pobox = e.target.value;
                                                setAddresslist(value);
                                            }} />
                                        </div>
                                        <div className='col-md-6'>
                                            <select className="form-select" id="addresstype" value={field.addresstype} onChange={(e) => {
                                                let value = [...addresslist];
                                                value[index].addresstype = e.target.value;
                                                setAddresslist(value);
                                            }}>
                                                <option>Label...</option>
                                                <option value="Home">Home</option>
                                                <option value="Office">Office</option>
                                            </select>
                                        </div>
                                        <div className='col-md-12 text-end'>
                                            <button className="btn btn-outline-danger" type='button' onClick={
                                                () => {
                                                    if (addresslist.length > 1) {
                                                        let value = [...addresslist];
                                                        delete value[index]

                                                        value = value.filter(function (element) {
                                                            return element !== undefined;
                                                        });
                                                        setAddresslist(value)
                                                    }
                                                }
                                            }>
                                                <span className="material-icons-outlined">delete</span>
                                            </button>
                                            <button type='button' className="btn btn-outline-primary" onClick={addAddress}><span className="material-icons-outlined">add</span></button>
                                        </div>


                                    </div>

                                ))}
                            </div>

                            {/* date of birth */}
                            <div className='mb-2'>
                                <input type="text" className='form-control' id='dob' value={dob} name='dob' placeholder='Date of Birth' onChange={(e) => { setDob(e.target.value) }} />
                            </div>

                            {/* notes */}
                            <div className='mb-2'>
                                <input type="text" className='form-control' id='notes' value={notes} name='notes' placeholder='Notes' onChange={(e) => { setNotes(e.target.value) }} />
                            </div>

                            {/* Label */}
                            <div className='mb-2'>
                                <select className="form-select" id="label" value={label} onChange={(e) => { setLebel(e.target.value) }}>
                                    <option>Label...</option>
                                    <option value="Friend">Friend</option>
                                    <option value="Family">Family</option>
                                    <option value="Office">Office</option>
                                    <option value="Others">Others</option>
                                </select>

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
