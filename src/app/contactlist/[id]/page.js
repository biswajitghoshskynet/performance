
'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import FormUpdateContact from '../../components/FormUpdateContact'

export default function Page({ params }) {
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
                            <button className='text-primary' onClick={() => {
                                if (edit === true) {
                                    setEdit(false)
                                }
                                else {
                                    setEdit(true)
                                }

                            }}>
                                <span className="material-icons-outlined">{edit === true ? 'close' : 'create'}</span>
                            </button>
                        </div>
                        : null}
                </div>


                <div className='row'>
                    <div className={edit === true ? 'col-md-6' : 'col-md-12'}>
                        {data?.success === true ?
                            <div>
                                <div className="card mb-3 position-relative">
                                    <div className='mb-3 favouriteIcon'>
                                        <span className={`material-icons-outlined 
                                        ${data?.data?.favourite === true ? 'text-warning' : null}
                                        `}>
                                            {
                                                data?.data?.favourite === true ? 'star' : 'star_outline'
                                            }
                                        </span>
                                    </div>
                                    <div className="row g-0 align-items-center">
                                        <div className="col-md-4 text-center">
                                            {
                                                data?.data?.photo ?
                                                    <img src={data.data.photo} alt="" />
                                                    :
                                                    <span className="material-icons-outlined profileIcon">face</span>
                                            }

                                        </div>
                                        <div className="col-md-8">

                                            <div className="card-body">
                                                <div className='mb-3'>
                                                <h1 className='d-flex gap-2 mb-1'>
                                                    <span>{data.data.name.prefix}</span>
                                                    <span>{data.data.name.name}</span>
                                                    <span>{data.data.name.suffix}</span>
                                                </h1>
                                                <p className='mb-0'><span className="material-icons-outlined">cake</span> {data.data.dob}</p>
                                                </div>
                                               
                                                <div className='mb-3'>
                                                    <div className='mb-1'>
                                                        {
                                                            data?.data?.organization ?
                                                                <div >
                                                                    <p className='mb-0'><strong>Company:</strong> {data.data.organization.company}</p>
                                                                    <p className='mb-0'><strong>Job title:</strong> {data.data.organization.jobtitle}</p>
                                                                    <p className='mb-0'><strong>Department:</strong> {data.data.organization.department}</p>
                                                                </div>
                                                                : null
                                                        }
                                                    </div>


                                                    {
                                                        data?.data?.label ?
                                                            <p className='mb-1'><strong>Label:</strong> {data.data.label}</p>
                                                            : null
                                                    }


                                                    <p className='mb-0'><strong>Note</strong></p>
                                                    {
                                                        data?.data?.notes ?
                                                            <p>{data.data.notes}</p>
                                                            : null
                                                    }

                                                </div>


                                                <p className='mb-0'><small className="text-body-secondary"><span className="material-icons-outlined">event</span> {moment(data.data.createdAt).format('MMMM Do YYYY, h:mm a')}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <h5 className="card-header">Contact Details</h5>
                                    <div className="card-body">
                                        <div className='mb-3'>
                                            <h3 className='mb-1'>Email</h3>
                                            {
                                                data?.data?.email?.map((item, index) => (
                                                    <div key={index} className='mb-1 d-flex gap-1'>
                                                        <span className="material-icons-outlined">
                                                            {
                                                                item.emailtype === "Home" ? 'home' :
                                                                    item.emailtype === "Office" ? 'contact_mail' :
                                                                        item.emailtype === "Personal" ? 'mail' :
                                                                            'mail_outline'
                                                            }
                                                        </span>
                                                        <p className="mb-0">
                                                            {item.email}
                                                        </p>
                                                    </div>

                                                ))
                                            }
                                        </div>

                                        <div className='mb-3'>
                                            <h3 className='mb-1'>Phone</h3>
                                            {
                                                data.data.phonelist.map((item, index) => (
                                                    <p className='mb-1' key={item._id}>

                                                        <span className="material-icons-outlined">
                                                            {
                                                                item.phonetype === "Home" ? 'home' :
                                                                    item.phonetype === "Office" ? 'apartment' :
                                                                        item.phonetype === "Mobile" ? 'phone_iphone' :
                                                                            'call'
                                                            }
                                                        </span>
                                                        {item.countrycode} {item.phone} </p>
                                                ))
                                            }
                                        </div>
                                        <div className='mb-3'>
                                            <h3 className='mb-1'>Address</h3>
                                            {
                                                data?.data?.addresslist?.map((item, index) => (
                                                    <div key={index} className='mb-1 d-flex gap-1'>
                                                        <span className="material-icons-outlined">
                                                            {
                                                                item.addresstype === "Home" ? 'home' :
                                                                    item.addresstype === "Office" ? 'apartment' :
                                                                        'location_on '
                                                            }
                                                        </span>
                                                        <p>
                                                            {item.country}, {item.street}, {item.city}, {item.pincode}, {item.pobox}
                                                        </p>
                                                    </div>
                                                ))
                                            }
                                        </div>





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
