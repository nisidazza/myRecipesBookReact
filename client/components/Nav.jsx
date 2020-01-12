import React from 'react'
import { Link } from 'react-router-dom'
import { logOff, getDecodedToken } from 'authenticare/client'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

class Nav extends React.Component {
    constructor(props) {
        super(props)
    }

    getUserName = () => {
        let myToken = getDecodedToken()
        if (myToken) {
            return myToken.username
        } else {
            return ''
        }
    }

    handleLogOff = () => {
        logOff()
        this.props.history.push('/')
    }

    render() {
        return (
            <>
                <div className="jumbotron text-center" style={{ marginBottom: '0' }}>
                    <h1>My Recipe Book</h1>
                    <p>Keep track of your favourite recipes!</p>
                </div>
                <nav className='navbar navbar-expand-sm navbar-light bg-light'>
                    <div className='navbar-collapse collapse justify-content-stretch" id="navbar6' role="navigation">
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/'>Home</Link>
                            </li>
                        </ul>
                    </div>
                    <ul className='navbar-nav ml-auto'>
                        <IfAuthenticated>
                            <div className='row'>
                                <div className='col-4'>
                                    <p className='nav-item'>
                                        <Link className='nav-link' to='/recipes'>Recipes List</Link>
                                    </p>
                                </div>
                            </div>
                            <div className='d-flex p-2'>
                                <li className='nav-item w-100 pl-1'><p className='nav-item'>Welcome, {this.getUserName()}!</p></li>
                                <li className='nav-item w-100 pl-2'>
                                    <Link to='#' className='nav-link' onClick={this.handleLogOff}>Log Off</Link>
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
            </>
        )
    }
}

export default Nav