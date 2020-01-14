import React from 'react'
import { signIn, isAuthenticated } from 'authenticare/client'


class SignIn extends React.Component {
    constructor(props) {
        super(props)

        this.loginData = {
            username: '',
            password: ''
        }
    }

    handleChange = e => {
        this.loginData[e.target.id] = e.target.value
    }

    handleSubmit = (e) => {
        e.preventDefault()
        signIn(
            this.loginData,
            {
                baseUrl: process.env.PUBLIC_BASE_API_URL // see .env and webpack.config.js
            }
        ).then((token) => {
            if (isAuthenticated()) {
                this.props.history.push('/')
            }
        })
    }

    render() {
        return (
            <form className='mx-auto' style={{ maxWidth: '500px', margin: 'auto' }} onSubmit={this.handleSubmit}>
                <h5 className='text-center mt-5'>Sign-In Form </h5>
                <div className='border mt-4'>
                    <div className='form-group row m-2 col-xs-3'>
                        <div className='input-container mx-auto mt-3 col-xs-3'>
                            <i class="fa fa-user icon" />
                            <input type='text' className='form-control' id='username' placeholder='Username' autoComplete='off' onChange={this.handleChange}></input>
                        </div>
                    </div>
                    <div className='form-group row m-2'>
                        <div className='input-container mx-auto col-xs-3'>
                            <i class="fa fa-key icon"></i>
                            <input type='password' className='form-control' id='password' placeholder='Password' autoComplete='off' aria-describedby='passwordHelpBlock' onChange={this.handleChange}></input>
                        </div>
                    </div>
                    <div className='input-container mx-auto mb-4 col-xs-3'>
                        <input value='Sign In' type='submit' className='btn btn-outline-success mx-auto' />
                    </div>
                </div>
            </form >

        )
    }

}

export default SignIn