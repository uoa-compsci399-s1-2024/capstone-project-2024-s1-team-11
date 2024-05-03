import API from '../../../api';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


export default function LoginForm({formFunction}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        setIsLogged(false);
        e.preventDefault();
        let res = await fetch(
          API + '/login',
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username: username, password: password })
          })
          if (res.status == 201){
            let data = await res.json();
            Cookies.set('username', username);
            Cookies.set('user_id', data.user_id);
            setIsLogged(true);
          }
        }
    return (
    <>
    <main>
        { !Cookies.get('username') &&
            <section className='login-form'>          
                <h1>Sign in</h1>
                <form onSubmit={handleLogin}>
                    <label name="username">Username
                        <input name="username" type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    </label>
                    <p><a href="#">Forgot username?</a></p>
                    <label name="password">Password
                        <input name="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </label>
                    <p><a href="#">Forgot password?</a></p>
                    <p>Insert captcha/I'm not a robot</p>
                    <button type='submit' className='btn'>login</button>
                </form>
                <section className='register-btn'>
                    <h2>New to Maths Rocks?</h2>
                    <button className='btn blue' onClick={() => formFunction()}>Create an account</button>
                </section>
            </section>
        }
        { (Cookies.get('username') || isLogged) &&
            <section className='login-success-msg'>
                <p>Welcome back, {Cookies.get('username')}!</p>
            </section>
        }
    </main>
    </>
    )
  }