'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../assets/img/logo.png'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';


export default function page() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])

    const router = useRouter()
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    

    const handelSubmit = async (e) => {
        e.preventDefault()
        let data = await fetch(`${process.env.HOST}api/users/`, {
            cache: 'no-store',
            method: "POST",
            body: JSON.stringify({ name, email, password })
        })
        data = await data.json()
        if (data.success === false) {
            if (data?.error?.message) {
                toast.error(data.error.message);
            }
            if (data?.message) {
                toast.error(data.message);
            }
        }
        else if (data.success === true) {
            toast.success(`Thank you`);
            setName('')
            setEmail('')
            setPassword('')
            setTimeout(() => {
                router.push('/login')
            }, 1000)
        }

    }
    return mounted && (
        <>
            <div className='signUpHold'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-sm-8 col-md-6 col-lg-5 col-xl-4'>
                            <div className='mb-3 text-center'>
                                <div className='mb-2'><Image src={Logo} priority={true} width={65} height={65} alt='SkyNet'></Image></div>
                                <h1>Sign Up</h1>
                            </div>
                            <form onSubmit={handelSubmit}>
                                <div className='formGroup'>
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input value={name} onChange={(e) => { setName(e.target.value) }} id="name" name="name" type="text" autoComplete="name" required className="form-control" />
                                </div>
                                <div className='formGroup'>
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} id="email" name="email" type="email" autoComplete="email" required className="form-control" />
                                </div>
                                <div className='formGroup'>
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} id="password" name="password" type="password" autoComplete="current-password" required className="form-control" />
                                </div>
                                <div className='mb-3 d-grid'>
                                    <button type="submit" className="btn btn-primary">Sign up</button>
                                </div>
                            </form>
                            <p className="mt-10 text-center text-sm text-gray-500">
                                Already member? <Link href="/login" className="text-primary">Sign in</Link>
                            </p>


                        </div>
                    </div>
                </div>
            </div>



            <ToastContainer />

        </>
    )
}




