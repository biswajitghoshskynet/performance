'use client'
import React, { useEffect, useState } from 'react'
import { deleteToken } from '@/lib/sitecookies'
import { useRouter, usePathname } from 'next/navigation'


export default function Header() {
    const router = useRouter()
    const pathname = usePathname()
    const [isUser, setUser] = useState(false)

    useEffect(()=>{
        const id = localStorage.getItem('userid')
        if(id){
            setUser(true)
        }
        else{
            setUser(false)
        }
    })




    const userLogOut = () => {
        deleteToken()
        localStorage.removeItem("userid");
        router.push('/login')
    }




    return (

        <>

            {isUser === true ?
                <header className='mb-3'>
                    <div className='container-fluid'>
                        <div className='d-flex justify-content-end'>
                            <div><button className='text-white' onClick={() => userLogOut()}><span className="material-icons-outlined">power_settings_new</span> logout</button></div>
                        </div>
                    </div>
                </header >
                : null
            }




        </>
    )
}
