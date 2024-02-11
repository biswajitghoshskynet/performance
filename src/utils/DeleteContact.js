
'use client'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





export default function DeleteContact(props) {
    const [owner, setOwner] = useState('')
   
    useEffect(() => {

        let user = localStorage.getItem('userid')
        setOwner(user)
    }, [])
   
 
    const id = props.id
    
    const handleFatch = async () => {

          let data = await fetch(`${process.env.HOST}api/contact/${id}`, {
                cache: 'no-store',
                method: 'delete',
                headers: {
                    'authorization': owner
                },
            })

            data = await data.json()
            if(data?.acknowledged === true){
                toast.success('Contact Deleted');
              
            }


    }

    return  (
        <>
            <button onClick={handleFatch} className='text-danger'><span className="material-icons-outlined">
                delete
            </span></button>
            <ToastContainer />
        </>
    )
}
