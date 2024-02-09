'use client'
import React, { useState } from 'react'

export default function Popup(props) {
    const [display, setDisplay] = useState(false)
    const handleDisplay = () =>{
        setDisplay(true)
    }
    const handleDisplayClose = () =>{
        setDisplay(false)
    }
    return (
        <>
            <button type='button' onClick={handleDisplay} className='btn btn-primary'>{props.button}</button>
            {display === true ?
                <>
                    <div className='popOverlay' onClick={handleDisplayClose}></div>
                    <div className='popBox'>{props.data}</div>
                </>
             :null}

        </>
    )
}
