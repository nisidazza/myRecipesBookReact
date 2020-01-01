import React from 'react'
import {Link} from 'react-router-dom'
import {logOff} from 'authenticare/client'

export default function Nav() {
    return(
        <>
            <Link to='/'>Home</Link>
            <Link to='/register'>Register</Link>
            <Link to='signin'>Sign In</Link>
            <Link to='#' onClick={logOff}>Log Off</Link>
        </>
    )
}