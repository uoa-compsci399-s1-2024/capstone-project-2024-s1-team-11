import API from '../../../api';
import React, { useState } from 'react';

  
export default function RegisterForm({formFunction}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('Auckland City');
  const [isPending, setIsPending] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  
  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsPending(true);
    let res = await fetch(
      API + '/registration',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: username, password: password, email: email, district: area})
      })
      setIsPending(false);
      if (res.status == 201){
        setIsSucceed(true);
      }
      let responseJson = await res.json();
      setStatusMsg(responseJson.message)
    }
  
    return (
      <>
        <h1>Join the Maths Rocks community</h1>
        <form onSubmit={handleRegistration}>
          <label name="username">Username
            <input name="username" type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
          </label>
          <label>What area do you live?
            <select id="area" name="area" value={area} onChange = {(e) => setArea(e.target.value)}>
              <option value="Auckland City">Auckland City</option>
              <option value="Manukau City">Manukau City</option>
              <option value="North Shore City">North Shore City</option>
              <option value="Waitakere City">Waitakere City</option>
              <option value="Franklin District">Franklin District</option>
              <option value="Papakura District">Papakura District</option>
              <option value="Rodney District">Rodney District</option>
              <option value="Outside of Auckland">Outside of Auckland</option>
            </select>
          </label>
          <label name="email">Email address
            <input name="email" type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
          </label>
          <label name="password"> Password
            <input name="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
          </label>
          {/*Insert captcha/I'm not a robot*/}
          <p>{statusMsg}</p>
          {!isPending && !isSucceed && <button type='submit' className='btn'>Register</button>}
          {isPending && <button type='submit' className='btn' disabled>Registering...</button>}
          <button className='btn' onClick={() => formFunction()}>Back to login</button>
        </form>
      </>
    )
  }