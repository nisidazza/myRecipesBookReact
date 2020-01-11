import React from 'react'
import { signIn, isAuthenticated } from 'authenticare/client'
import { Link } from 'react-router-dom'

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
                this.props.history.push('/recipes')
            }
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>
                Username: <input type='text' id='username' autoComplete='off' onChange={this.handleChange}></input>
                <br />
                Password: <input type='password' id='password' autoComplete='off' onChange={this.handleChange}></input>
                <br />
                <div>
                    <input value='Sign In' type='submit' />
                </div>
            </form>
        )
    }

}

export default SignIn