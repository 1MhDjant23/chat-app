import { useState } from "react";
import  { registerApi } from '../api/auth.api.js';
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiLock } from "react-icons/fi";
import Logo from    './public/assets/logo.svg';
import  './public/css/register.css';

export  const   Register = () => {
    const   [username, setUsername] = useState('');
    const   [password, setPassword] = useState('');
    const   navigate = useNavigate();

    const   handleSubmit = async (e) => {
        e.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            alert('Enter valid credentials');
            return ;
        }

        try {
            const   response = await registerApi(
                {
                    username: username,
                    password: password
                }
            );
            alert(response.message);
            navigate('/login', {
                state: {
                    message: 'Account created. Please login'
                }
            });
        } catch (error) {
            console.log('register fail:', error.message);
            alert(error.message || 'Register Fail');
        }
    }

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="brand">
                    <div className="title">
                        <img src={Logo} alt="App logo" />
                        <h1>Registration Form</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="register-group">

                        <label htmlFor="username" >Username</label>
                        <div className="input-wrapper">  
                            <FiUser className="input-icon"/>
                            <input
                                id="username"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                type="text"
                                placeholder="enter username"
                                required
                            />
                        </div>
                    </div>

                    <div className="register-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <FiLock className="input-icon" />
                            <input
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="text"
                                placeholder="enter username"
                                required
                                />
                        </div>
                    </div>
                    <button className="btn-primary" type="submit">Register</button>
                </form>
                <div className="row-between">
                    <span className="small-link">
                        already have Account?<Link to="/login">Sign in</Link>
                    </span>
                </div>
            </div>

        </div>
    );
}