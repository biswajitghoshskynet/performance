'use client'
import React, { useEffect, useState } from 'react'
import { deleteToken } from '@/lib/sitecookies'
import { useRouter } from 'next/navigation'


export default function Header() {
    const router = useRouter()
    const [isUser, setUser] = useState(null)
 


    
    const userLogOut = () => {
        deleteToken()
            
    }




    return (

        <>
            
                <header className='mb-3'>
                    <div className='container-fluid'>
                        <div className='d-flex justify-content-end'>
                            <div><button className='text-white' onClick={() => userLogOut()}><span className="material-icons-outlined">power_settings_new</span> logout</button></div>
                        </div>
                    </div>
                </header>
            

        </>
    )
}
