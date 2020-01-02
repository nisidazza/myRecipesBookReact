import React from 'react'
import { Link } from 'react-router-dom'
import { logOff, getDecodedToken } from 'authenticare/client'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export default function Nav() {

    function getUserName() {
        let myToken = getDecodedToken()
        if (myToken) {
            return myToken.username
        } else {
            return ''
        }
    }

    return (
        <>
            <Link to='/'>Home</Link>
            <IfAuthenticated>
                <Link to='#' onClick={logOff}>Log Off</Link>
                <p>Welcome, {getUserName()}!</p>
            </IfAuthenticated>
            <IfNotAuthenticated>
                <Link to='/register'>Register</Link>
                <Link to='signin'>Sign In</Link>
            </IfNotAuthenticated>
        </>
    )
}