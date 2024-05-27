import API from '../../../api';
import { useState } from 'react';
import Cookies from 'js-cookie';


export default function LoginForm({formFunction}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [statusMsg, setStatusMsg] = useState('');
    const [isLogged, setIsLogged] = useState(Cookies.get('username')!==undefined);
    const [isForgetPassword, setIsForgetPassword] = useState(false);
    const [showForgetPassword, setShowForgetPassword] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setStatusMsg('Password does not match');
            return;
        }
        let res = await fetch(API + '/forgetPassword/toChangePassword',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username: username, newPassword: password })
            }
        )
        let data = await res.json();
        if (res.status === 200) {
            setShowForgetPassword(false);
        } else {
            setStatusMsg(data.message);
        }
        
    }

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        let res = await fetch(API + '/forgetPassword',
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username: username, email: email })
          }
        )
        
        let data = await res.json();

        if (res.status === 200){
            setStatusMsg(data.message);
            setIsForgetPassword(false);
            setShowForgetPassword(true);
        } else {
            setStatusMsg(data.message);
        }
    }

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
            (!isForgetPassword ? (
                (showForgetPassword ? (
                    <section className='login-form'>
                        <h1>Forget Password</h1>
                        <form onSubmit={handleResetPassword}>
                            <label name="newpassword">
                                <input name="newpassword" type='password' value={password} placeholder="New Password"
                                    onChange={(e) => setPassword(e.target.value)}></input>
                            </label>
                            <label name="confirmpassword">
                                <input name="confirmpassword" type='password' value={confirmPassword} placeholder="Confirm Password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}></input>
                            </label>
                            <p>{statusMsg}</p>
                            <button type='submit' className='btn'>Submit</button>
                        </form>
                    </section>
                ) : (
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
                            <p><a onClick={() => setIsForgetPassword(true)}>Forgot password?</a></p>
                            <button type='submit' className='btn'>🔑log in</button>
                        </form>
                        <p>{statusMsg}</p>
                        <section className='register-btn'>
                            <h2>New to Maths Rocks?</h2>
                            <button className='btn blue' onClick={() => formFunction()}>Create an account</button>
                        </section>
                    </section>
                ))
            ): (
                <section className='login-form'>
                    <h1>Forget Password</h1>
                    <form onSubmit={handleForgetPassword}>
                        <label name="username">
                            <input name="username" type='text' value={username} placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}></input>
                        </label>
                        <label name="email">
                            <input name="email" type='email' value={email} placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}></input>
                        </label>
                        <p>{statusMsg}</p>
                        <button type='submit' className='btn'>Submit</button>
                    </form>
                </section>
            ))
            
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
    </>
    )
  }
