import React, { useEffect, useState } from 'react'

export default function Favourite({ id, setReload, reload }) {
    const [data, setData] = useState(null)
    const [favourite, setFavourite] = useState(null)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let response = await fetch(`${process.env.HOST}api/contact/${id}`, {
            cache: 'no-store'
        }).then((response) => {
            response = response.json()
            return response
        })
        .then((response)=>{
            setData(response)
                
          
            
        })
        .then(() => {
           
            if (data?.data?.favourite == true) {
                setFavourite(false)
            }
            if (data?.data?.favourite == false) {
                setFavourite(true)
            }
            
        })
    }
   
    const handleSubmit = async () => {
        e.preventDefault();
        await fetch(`${process.env.HOST}api/contact/${id}`, {
            cache: 'no-store',
            method: "PUT",
            body: JSON.stringify({ photo, name, organization, email, phonelist, addresslist, dob, notes, label })
        }).then(() => {
            setReload(reload + 1)
        })
    }
    return (
        <>
       {
         console.log(`Get:- ${data?.data?.favourite}`)
        
       }
       { console.log(`Send:- ${favourite}`)}
            <button type='button' onClick={handleSubmit}>
                <span className={`material-icons-outlined 
                                        ${data?.data?.favourite === true ? 'text-warning' : null}
                                        `}>
                    {
                        data?.data?.favourite === true ? 'star' : 'star_outline'
                    }
                </span>
            </button>
        </>
    )
}
