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
        <nav className='navbar navbar-expand-lg navbar-light bg-light ' role='navigation'>

            <a className="navbar-brand" href="/">
                {/* <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""/> */}
                My Recipes Book</a>
            <Link to='/recipes'>Home</Link>
            <div className='collapse navbar-collapse flex-grow-0 text-right'>
                <ul className='navbar-nav'>
                <IfAuthenticated>
                    <li className='nav-item w-100 pl-2'>
                    <Link to='#' className='nav-link' onClick={logOff}>Log Off</Link></li>
                    <li className='nav-item w-100 pl-2'><p>Welcome, {getUserName()}!</p></li>
                </IfAuthenticated>
                </ul>
                <ul className='navbar-nav ml-auto'>
                <IfNotAuthenticated>
                    <div className='d-flex'>
                        <div className='p-2'>
                           <li className='nav-item w-100 pl-2'><Link to='/register'className='nav-link'>Register</Link></li> 
                        </div>
                        <div className='p-2'>
                        <li className='nav-item w-100 pl-2'><Link to='/signin'className='nav-link'>Sign In</Link></li> 
                        </div>
                    </div>
                </IfNotAuthenticated>
                </ul>
            </div>
        </nav>
    )
}