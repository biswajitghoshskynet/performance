
'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import FormUpdateContact from '../../components/FormUpdateContact'

export default function page({ params }) {
    const [data, setData] = useState({})
    const [edit, setEdit] = useState(false)
    useEffect(() => {
        loadContact()
    })

    const loadContact = async () => {
        let response = await fetch(`${process.env.HOST}api/contact/${params.id}`, {
            cache: 'no-store'
        })
        response = await response.json()
        setData(response)
    }


    return (
        <>

            <div className='container-fluid'>

                <div className='d-flex justify-content-between mb-3'>
                    <div>
                        <Link href="/contactlist" className='text-primary'><span className="material-icons-outlined">chevron_left</span></Link>
                    </div>
                    {data?.success === true ?
                        <div>
                            <button className='text-primary' onClick={() => 
                                { 
                                    if(edit===true){
                                        setEdit(false) 
                                    }
                                    else{
                                        setEdit(true) 
                                    }
                                    
                                }}>
                                <span className="material-icons-outlined">{edit === true ?'close':'create'}</span>
                            </button>
                        </div>
                        : null}
                </div>


                <div className='row'>
                    <div className={edit === true ? 'col-md-6' : 'col-md-12'}>
                        {data?.success === true ?
                            <div>
                                <div className="card mb-3">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-md-4 text-center">
                                            <span className="material-icons-outlined profileIcon">face</span>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h1>{data.data.name}</h1>
                                                <p><small className="text-body-secondary"><span className="material-icons-outlined">event</span> {moment(data.data.createdAt).format('MMMM Do YYYY, h:mm a')}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <h5 className="card-header">Contact Details</h5>
                                    <div className="card-body">
                                        {data?.data?.email?.map((item, index) => (
                                            <p className="mb-1" key={index}><span className="material-icons">mail_outline</span> {item}</p>
                                        ))}
                                        <p><span className="material-icons-outlined">cake</span> {data.data.dob}</p>
                                        {data.data.phonelist.map((item, index) => (
                                            <p key={item._id}>

                                                <span className="material-icons-outlined">
                                                    {
                                                        item.phonetype === "Home" ? 'home' :
                                                            item.phonetype === "Office" ? 'apartment' :
                                                                item.phonetype === "Mobile" ? 'phone_iphone' :
                                                                    'call'
                                                    }
                                                </span>
                                                {item.phone} </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            : null}
                    </div>
                    {edit === true ?
                        <div className='col-md-6'>
                            <FormUpdateContact id={params.id} />
                        </div>
                        : null}

                </div>




            </div>
        </>
    )
}
