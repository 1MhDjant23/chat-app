import { Link, useLocation } from 'react-router-dom';
import  {loginApi} from '../api/auth.api.js';
import { useEffect, useState } from "react";
import { FiUser, FiLock } from 'react-icons/fi';
import { toast } from 'react-toastify';
import "./public/css/login.css";
import Logo from "./public/assets/logo.svg";

export  function    Login({ setToken }) {
    // const   [username, setUsername] = useState('');
    const   [password, setPassword] = useState('');
    const   [email, setEmail] = useState('');

    const   [error, setError] = useState(null);

    const   location = useLocation();

    useEffect(() => {
        if (location.state?.message) {
            toast.success(location.state.message);
            location.state = null;
        }
    }, [location])

    useEffect(() => {
        if(error) {
            toast.error(error.message);
            setError(null);
        }

    }, [error])

    const   handleSubmit = async (e) => {
        e.preventDefault();
        if(email.trim() === '' || password.trim() === ''){
            return ;
        }
        try {
            const   response = await loginApi({
                email: email,
                password: password
            });
            localStorage.setItem('token', response.token);
            setToken(response.token);
            setEmail('');
            setPassword('');

            toast.success(`${response.message} | ${response.user.username}`)

        } catch (error) {
            console.log('Login error:', error.message);
            setError(error);
        }
    };

    return (
        <div className='login-container'>
            <div className='login-card'>
                <div className='brand'>
                    <div className='title'>
                        <img src={Logo} alt="App logo" />
                        <h1>Sign in</h1>
                    </div>
                        <div className='welcome-title'>
                            Welcome back - please sign in to your account
                        </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='email' >email</label>
                        <div className='input-wrapper'>
                            <FiUser className='input-icon'/>
                            <input
                                type='email'
                                id='email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="enter email..."
                                required
                            />
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="Password">password</label>
                        <div className="input-wrapper">
                        <FiLock className='input-icon'/>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="enter password..."
                            required
                            />
                        </div>
                    </div>
                    <button className='btn-primary' type="submit">Login</button>
                </form>
                <div className='row-between'>
                    <span className='small-link'>
                        Don't have an account?<Link to={'/register'}>Sign up</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

