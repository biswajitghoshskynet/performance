import React from 'react'
import FormAddContact from '../components/FormAddContact'

import { getToken } from '@/lib/sitecookies';
import DeleteContact from '@/utils/DeleteContact'
import Link from 'next/link';
import Popup from '../components/Popup';

export default async function page() {
  let token = await getToken()

  let data = await fetch('http://localhost:3000/api/contact', {
    cache: 'no-store',
    headers: {
      'authorization': token
    },

  })
  data = await data.json()


  return (
    <>
      <div className='container-fluid'>
       
        <div className='mb-2'>

          <FormAddContact />
          {/* <ContactForm/> */}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col" className='text-center'>View</th>
              <th scope="col" className='text-center'>Delete</th>
            </tr>
          </thead>
          <tbody>

            {data?.data?.length>0?data.data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name ? item.name : null}</td>
                <td>{item.email[0]?item.email[0]:null}</td>
                <td>{item.phonelist[0]?.phone}</td>
                <td className='text-center'><Link href={`/contactlist/${item._id}`} className='text-primary'><span className="material-icons-outlined">
                  visibility
                </span></Link></td>
                <td className='text-center'><DeleteContact id={item._id} /></td>
              </tr>
            )):<tr><td className='text-center' colSpan={6}>No contact found</td></tr>}
          </tbody>
        </table>
      </div>

    </>
  )
}
