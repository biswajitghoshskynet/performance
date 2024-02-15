import React, { useEffect, useState } from 'react'

export default function Favourite({ id, setReload, reload }) {
    const [data, setData] = useState(null)
    // const [favourite, setFavourite] = useState(null)

    useEffect(() => {
        getData()
    }, [reload])

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
        
    }
    const handleChange =(e)=>{
     
        if (data?.data?.favourite == true) {
            setFavourite(false)
        }
        if (data?.data?.favourite == false) {
            setFavourite(true)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let favourite = await e.target.value
        if(favourite == 'true'){
            e.target.value = 'false' 
        }
        else{
            e.target.value = 'true'
        }
     
        console.log(favourite);
       
        await fetch(`${process.env.HOST}api/contact/${id}`, {
                cache: 'no-store',
                method: "PUT",
                body: JSON.stringify({ favourite })
            })
        await fetch(`${process.env.HOST}api/contact/${id}`, {
            cache: 'no-store',
            method: "PUT",
            body: JSON.stringify({ favourite })
        }).then(() => {
            setReload(reload + 1)
        })
    }
    return (
        <>
       {/* {
         console.log(`Get:- ${data?.data?.favourite}`)
        
       }
       { console.log(`Send:- ${favourite}`)} */}
            <button value={data?.data?.favourite == true? 'true': 'false'} type='button' onClick={handleSubmit}>
                <span className={`material-icons-outlined 
                                        ${data?.data?.favourite === true ? 'text-warning' : null}
                                        `}>
                    {
                        data?.data?.favourite === true ? 'star' : 'star_outline'
                    }
                </span>
                
            </button>
            {/* <button type='button' value='true' onClick={handleSubmit}>Button</button> */}
            
        </>
    )
}
