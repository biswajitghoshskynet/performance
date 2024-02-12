
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
                                <div className="card mb-3">
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
                                                <h1 className='d-flex gap-2'>
                                                    <span>{data.data.name.prefix}</span>
                                                    <span>{data.data.name.name}</span>
                                                    <span>{data.data.name.suffix}</span>


                                                </h1>
                                                <p><small className="text-body-secondary"><span className="material-icons-outlined">event</span> {moment(data.data.createdAt).format('MMMM Do YYYY, h:mm a')}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <h5 className="card-header">Contact Details</h5>
                                    <div className="card-body">
                                        {
                                            data?.data?.email?.map((item, index) => (
                                                <p className="mb-1" key={index}><span className="material-icons">mail_outline</span> {item.email} ({item.emailtype})</p>
                                            ))
                                        }
                                        <p><span className="material-icons-outlined">cake</span> {data.data.dob}</p>
                                        {
                                            data?.data?.organization ?
                                                <div className='mb-2'>
                                                    <p className='mb-1'><strong>Organization:-</strong></p>
                                                    <p className='mb-1'>Company: {data.data.organization.company}</p>
                                                    <p className='mb-1'>Job title: {data.data.organization.jobtitle}</p>
                                                    <p className='mb-1'>Department: {data.data.organization.department}</p>
                                                </div>
                                                : null
                                        }

                                        {
                                            data.data.phonelist.map((item, index) => (
                                                <p key={item._id}>

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

                                        {
                                            data?.data?.addresslist?.map((item, index) => (
                                                <div key={index}>
                                                    <p className='mb-2'>
                                                        <strong>Address:-</strong><br />
                                                        {item.country}, {item.street}, {item.city}, {item.pincode}, {item.pobox} ({item.addresstype})
                                                    </p>
                                                </div>
                                            ))
                                        }

                                        {
                                            data?.data?.notes ?
                                                <p><strong>Note:-</strong>  {data.data.notes}</p>
                                                : null
                                        }
                                        {
                                            data?.data?.label ?
                                                <p><strong>Label:-</strong>  {data.data.label}</p>
                                                : null
                                        }
                                        <p><strong>favourite-</strong> {data?.data?.favourite === true ? 'True' : "False"}</p>
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
