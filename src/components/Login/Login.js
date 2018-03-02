import React, { Component } from 'react';
import './Login.css';

class Login extends Component{
    render(){
        return (
            <div className="login-root">
                <div className="login-box">
                    <img src="https://github.com/DevMountain/simulation-3/blob/master/assets/logo.png?raw=true" alt="" className="winky-face"/>
                    <div className="login-title">Helo</div>
                    <a href='http://localhost:3002/auth'><button className="login_btn">Login / Register</button></a>
                </div>
            </div>
        )
    }
}

export default Login;