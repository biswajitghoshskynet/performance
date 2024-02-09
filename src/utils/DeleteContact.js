
'use client'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default async function deleteContact(props) {
    const id = await props.id
   
    const handleFatch = async () => {
      let data = await fetch(`${process.env.HOST}api/contact/${id}`, {
            cache: 'no-store',
            method: 'delete'
        })

        data = await data.json()
        if(data?.acknowledged === true){
            toast.success('Contact Deleted');
        }
        
       
    }


    return (
        <>
            <button onClick={handleFatch} className='text-danger'><span class="material-icons-outlined">
delete
</span></button>
            <ToastContainer />
        </>
    )
}
