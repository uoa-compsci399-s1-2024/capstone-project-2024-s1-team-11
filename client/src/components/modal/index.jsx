import './styles.css'
import React, { useState } from 'react';
import Hamburger from '../Hamburger';

function LoginForm({formFunction}) {
  return (
    <>
     <section className='login-form'>          
          <h1>Sign in</h1>
          <form>
            <label name="username">Username
              <input name="username" type='text'></input>
              </label>
            <p>Forgot username?</p>
            <label name="password">Password
              <input name="password" type='password'></input>
            </label>
            <p>Forgot password?</p>
            <p>Insert captcha/I'm not a robot</p>
            <button type='submit' className='btn'>login</button>
          </form>
        </section>

        <section className='register-btn'>
          <h2>New to Maths Rocks?</h2>
          <button className='btn' onClick={() => formFunction()}>Create an account</button>
        </section>
    </>
  )
}

function RegisterForm({formFunction}) {
  return (
    <>
    <h1>Join the Maths Rocks community</h1>
          <form>
            <label name="username">Username
              <input name="username" type='text'></input>
            </label>
            <label>What area do you live?
            <select id="area" name="area">
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
              <input name="email" type='email'></input>
            </label>
            <label name="password">Password
              <input name="password" type='password'></input>
            </label>
            <p>Insert captcha/I'm not a robot</p>
            <button type='submit' className='btn'>login</button>
            <button className='btn' onClick={() => formFunction()}>Back to login</button>

          </form>
    </>
  )
}

export default function Modal({ close, formState, formFunction }) {

    return (
      <>
      <div className="modal">
      <div className="modal-container">
        <div className="modal-body">
          <span className='close' onClick={() => close()}>
            <Hamburger />
          </span>
          {formState ? 
          <LoginForm formFunction={formFunction} /> :
          <RegisterForm formFunction={formFunction} /> }
        </div>
      </div>
      </div>
      </>
    );
  }
  
