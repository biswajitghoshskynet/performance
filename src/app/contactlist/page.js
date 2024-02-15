'use client'
import React, { useEffect, useState } from 'react'
import FormAddContact from '../components/FormAddContact'

import { getToken } from '@/lib/sitecookies';
import DeleteContact from '@/utils/DeleteContact'
import Link from 'next/link';
import Favourite from '../components/Favourite';


export default function Page() {
  const [mounted, setMounted] = useState(false);

  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState(null)
  const [filterFav, setFilterFav] = useState(null)


  const [data, setData] = useState({})
  const [reload, setReload] = useState(1)

  useEffect(() => {
    setMounted(true)
    getresponse()

  }, [reload])

  const handleFav = (e) => {
    if (e.target.checked) {
      setFilterFav(true)
    }
    else {
      setFilterFav(null)
    }
  }

  const getresponse = async () => {
    let token = await getToken()
    let response = await fetch(`${process.env.HOST}api/contact`, {
      cache: 'no-store',
      headers: {
        'authorization': token
      },
    })
    response = await response.json()
    setData(response)

  }




  return mounted && (
    <>
      <div className='container-fluid'>
        {console.log(data)}
        <div className='mb-2'>
          <FormAddContact setReload={setReload} reload={reload} />
        </div>


        <div className='d-flex mb-2 gap-3 align-items-center justify-content-between'>
          <div className='d-flex gap-3 align-items-center'>
            <div><h4 className='mb-0'>Filter By</h4></div>
            <div>
              <select className="form-select" id="label" value={filter} onChange={(e) => { setFilter(e.target.value) }}>
                <option value="All">All</option>
                <option value="Friend">Friend</option>
                <option value="Family">Family</option>
                <option value="Office">Office</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className='d-flex gap-2'>
              <input type="checkbox" className="form-check-input" id='fav' onChange={handleFav} />
              <label className="form-check-label" htmlFor="fav">
              Favourite
              </label>
            </div>

          </div>
          <div>
            <input type="text" className='form-control' name='search' id='search' placeholder='Search' onChange={(e) => { setSearch(e.target.value) }} />
          </div>
        </div>
        {console.log(search)}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">label</th>
              <th scope="col">Fav</th>
              <th scope="col" className='text-center'>View</th>
              <th scope="col" className='text-center'>Delete</th>
            </tr>
          </thead>
          <tbody>

            {data?.data?.length > 0 ? data.data
              .filter((item) => (
                filter == 'All' ? item.label : item.label == filter
              ))
              .filter((item) => (
                search == null ? item.label : item.name.name.match(search)
              ))
              .filter((item) => (
                filterFav == null ? item.favourite != undefined : item.favourite == true
              ))
              .map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td style={{ textTransform: 'capitalize' }}>{item.name.name ? item.name.name : null}</td>
                  <td>{item.email[0] ? item.email[0].email : null}</td>
                  <td>{item.phonelist[0]?.phone}</td>
                  <td>{item.label}</td>
                  <td><Favourite id={item._id} setReload={setReload} reload={reload} /></td>
                  <td className='text-center'><Link href={`/contactlist/${item._id}`} className='text-primary'><span className="material-icons-outlined">
                    visibility
                  </span></Link></td>
                  <td className='text-center'><DeleteContact id={item._id} setReload={setReload} reload={reload} /></td>
                </tr>
              )) : <tr><td className='text-center' colSpan={8}>No contact found</td></tr>}
          </tbody>
        </table>
      </div>

    </>
  )
}
