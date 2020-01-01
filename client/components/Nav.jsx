import React from 'react'
import { Link } from 'react-router-dom'
import { logOff } from 'authenticare/client'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export default function Nav() {
    return (
        <>
            <Link to='/'>Home</Link>
            <IfAuthenticated>
                <Link to='#' onClick={logOff}>Log Off</Link>
            </IfAuthenticated>
            <IfNotAuthenticated>
                <Link to='/register'>Register</Link>
                <Link to='signin'>Sign In</Link>
            </IfNotAuthenticated>
        </>
    )
}