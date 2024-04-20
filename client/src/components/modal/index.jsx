import './styles.css'
import React, { useState } from 'react';
import Hamburger from '../Hamburger';

export default function Modal({ close }) {

    return (
      <>
      <div className="modal">
      <div className="modal-container">
        <div className="modal-body">
          <span className='close' onClick={() => close()}>
            <Hamburger />
          </span>

          <section className='login-form'>          
            <h1>Sign in</h1>
            <form>
              <label name="username">Username</label>
              <input name="username" type='text'></input>
              <p>Forgot username?</p>
              <label name="password">Password</label>
              <input name="password" type='password'></input>
              <p>Forgot password?</p>
              <p>Insert captcha/I'm not a robot</p>
              <button type='submit' className='btn'>login</button>
            </form>
          </section>

          <section className='register-btn'>
            <h2>New to Maths Rocks?</h2>
            <button  className='btn'>Create an account</button>
          </section>
        </div>
      </div>
      </div>
      </>
    );
  }
  
