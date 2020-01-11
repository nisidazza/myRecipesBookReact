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
        <nav className='navbar navbar-expand-sm navbar-light bg-light'>
            <a className="navbar-brand" href="/">
                {/* <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""/> */}
                My Recipes Book</a>
            <div className='navbar-collapse collapse justify-content-stretch" id="navbar6' role="navigation">
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/'>Home</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/recipes'>Recipes List</Link>
                    </li>
                </ul>
            </div>
            <ul className='navbar-nav ml-auto'>
                <IfAuthenticated>
                    <div className='d-flex p-2'>
                        <li className='nav-item w-100 pl-1'><p className='nav-item'>Welcome, {getUserName()}!</p></li>
                        <li className='nav-item w-100 pl-2'>
                            <Link to='#' className='nav-link' onClick={logOff}>Log Off</Link>
                        </li>
                    </div>
                </IfAuthenticated>
            </ul>
            <ul className='navbar-nav ml-auto'>
                <IfNotAuthenticated>
                    <div className='d-flex p-2'>
                        <li className='nav-item w-100 pl-2'><Link to='/register' className='nav-link'>Register</Link></li>
                        <li className='nav-item w-100 pl-2'><Link to='/signin' className='nav-link'>Sign In</Link></li>
                    </div>
                </IfNotAuthenticated>
            </ul>
        </nav>
    )
}