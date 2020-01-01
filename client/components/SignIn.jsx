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

    handleClick = () => {
        signIn(
            this.loginData,
            {
                baseUrl: process.env.BASE_API_URL // see .env and webpack.config.js
            }
        ).then((token) => {
            if (isAuthenticated()) {
                this.props.history.push('/')
            }
        })
    }

    render() {
        return (
            <>
                <h3>Sign In</h3>
                Username: <input type='text' id='username' onChange={this.handleChange}></input>
                <br />
                Password: <input type='password' id='password' onChange={this.handleChange}></input>
                <br />
                <button onClick={this.handleClick}>Sign In</button>
            </>
        )
    }

}

export default SignIn