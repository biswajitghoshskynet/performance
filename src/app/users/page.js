


import React from 'react'
import Link from 'next/link';
import { getToken } from '../../lib/sitecookies';


export default async function page() {
    let token = await getToken()
   
    let data = await fetch(`${process.env.HOST}api/users/`,
        {
            cache: 'no-store',
            headers: {
                'authorization': token?token:null
            },
        }
    );
    data = await data.json()

    return  (
        <>
            <section className='p-10'>
               
                <div className='container-fluid'>

                    <div className='list-group'>
                        {data.success=== true?
                        data?.data?.map((item, index) => (

                            <Link href={`/users/${item._id}`} key={item._id} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0" />
                                <div className="d-flex gap-2 w-100 justify-content-between">
                                    <div>
                                        <h6 className="mb-0">{item.name}</h6>
                                        <p className="mb-0 opacity-75">{item.email}</p>
                                    </div>

                                </div>
                            </Link>
                        ))
                        :"Authorization failed due to invalid token"
                        }
                        


                    </div>


                </div>




            </section>

        </>
    )
}
