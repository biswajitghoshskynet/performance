'use client'
import React from 'react'



export default async function page({ params }) {

    let data = await fetch(`${process.env.HOST}api/users/user/${params.id}`, { cache: 'no-store' })
    data = await data.json()

    return (
        <>
         
            <div className='container'>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{`${data[0].name ? data[0].name : null}`}</h5>
                        <p className="card-text">{`${data[0].email ? data[0].email : null}`}</p>
                    </div>
                </div>
            </div>


        </>
    )
}
