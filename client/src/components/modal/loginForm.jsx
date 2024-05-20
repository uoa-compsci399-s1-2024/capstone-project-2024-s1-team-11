import API from '../../../api';
import { useState } from 'react';
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";


export default function LoginForm({formFunction}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [statusMsg, setStatusMsg] = useState('');
    const [isLogged, setIsLogged] = useState(Cookies.get('username')!==undefined);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();

        let res = await fetch(API + '/login',
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username: username, password: password })
          }
        )

        let data = await res.json();

        if (res.status === 201){
            Cookies.set('username', username);
            Cookies.set('user_id', data.user_id);
            Cookies.set('signature', data.signature);
            setIsLogged(true);
            setTimeout(function(){
                window.location.reload();
            }, 1000);
        }
        setStatusMsg(data.message);
    }

    return (
    <>
    <main>
        { (Cookies.get('username')===undefined || !isLogged) &&
            <section className='login-form'>
                <h1>Sign in</h1>
                <form onSubmit={handleLogin}>
                    <label name="username">
                        <input name="username" type='text' value={username} placeholder="Username"
                               onChange={(e) => setUsername(e.target.value)}></input>
                    </label>
                    <p><a href="#">Forgot username?</a></p>
                    <label name="password">
                        <input name="password" type='password' value={password} placeholder="Password"
                               onChange={(e) => setPassword(e.target.value)}></input>
                    </label>
                    <p><a href="#">Forgot password?</a></p>
                    <button type='submit' className='btn'>🔑log in</button>
                </form>
                <p>{statusMsg}</p>
                <section className='register-btn'>
                    <h2>New to Maths Rocks?</h2>
                    <button className='btn blue' onClick={() => formFunction()}>Create an account</button>
                </section>
            </section>
        }
        { (Cookies.get('username')!==undefined && isLogged) &&
            <section className='login-success-msg'>
                <p>🦊Welcome back,<br></br> {Cookies.get('username')}!</p>
            </section>
        }
    </main>
    </>
    )
  }